import { useEffect, useState, useCallback } from "react";
import IMessageProp from "../interface/IMessageProp";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface FetchDataResponse {
  jobId: string;
  status: number;
  share_id: string;
  message: string;
}

const gradingUrl = "https://sitegrade.heatmapcore.com/api/validate";

const useFetchAndListen = () => {
  const [message, setMessage] = useState<IMessageProp | null>(null);
  const [update, setUpdate] = useState<string | null>(null);
  const [error, setError] = useState<{
    type: "progress" | "report";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationData, setValidationData] =
    useState<FetchDataResponse | null>(null);
  const [bodyData, setBodyData] = useState();

  const location = useLocation();

  useEffect(() => {
    setBodyData({ ...location.state, average_revenue: 19000 });
  }, [location]);

  useEffect(() => {
    const storedMessage = localStorage.getItem("message");
    if (storedMessage) {
      setMessage(JSON.parse(storedMessage));
    }
  }, []);

  const getJobId = useCallback(async () => {
    setIsLoading(true);
    if (!bodyData) return;

    try {
      const response = await fetch(gradingUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData: FetchDataResponse = await response.json();
      setValidationData(responseData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError({
        type: "progress",
        message: "An error occurred while fetching the job ID.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [bodyData]);

  const fetchReportsData = useCallback(async (jobId: string) => {
    console.log("Fetching reports data...");
    try {
      const response = await axios.get<IMessageProp[]>(
        `https://sitegrade.heatmapcore.com/api/reports/${jobId}`
      );
      const fetchedData = response.data;

      if (fetchedData[0].site_audit_s3_uri) {
        setMessage(fetchedData[0]);
        localStorage.setItem("message", JSON.stringify(fetchedData[0]));
      } else {
        throw new Error("No site_audit_s3_uri found.");
      }
    } catch (error) {
      console.error("Error while getting reports:", error);
      setError({ type: "report", message: "Unable to get reports data" });
    }
  }, []); // No dependencies since it doesn't rely on outside state

  const fetchDataAndListen = useCallback(
    (jobId: string) => {
      const eventSource = new EventSource(
        `https://sitegrade.heatmapcore.com/api/progress/${jobId}`
      );

      eventSource.onopen = () => {
        console.log("Connection opened!!");
      };

      eventSource.onerror = () => {
        if (eventSource.readyState === EventSource.CLOSED) {
          setError({
            type: "progress",
            message: "Listening connection closed",
          });
          setUpdate(null);
        } else {
          setError({
            type: "progress",
            message: "Listening encountered an error, Retrying...",
          });
          setUpdate(null);
        }
      };

      eventSource.onmessage = async (sourceMessage) => {
        const parsedData = JSON.parse(sourceMessage.data);
        setUpdate("Getting insight...");
        setError(null);
        setMessage(parsedData);

        if (
          parsedData?.status === "completed" &&
          parsedData?.process_stage === "report_generation"
        ) {
          setUpdate("Finishing up...");
          eventSource.close();
          console.log("Listening has ended.");

          await fetchReportsData(parsedData.id); // Fetch the reports data
        }
      };

      return () => {
        eventSource.close();
        console.log("Listening connection closed on cleanup.");
      };
    },
    [fetchReportsData]
  ); // Now has a stable reference

  useEffect(() => {
    if (!message) {
      getJobId();
    }
  }, [message, getJobId]);

  useEffect(() => {
    if (validationData) {
      if (validationData.jobId && validationData.status !== 1) {
        const cleanupListener = fetchDataAndListen(validationData.jobId);
        return cleanupListener;
      } else if (validationData.jobId && validationData.status === 1) {
        fetchReportsData(validationData.jobId); // Only fetch report data
      }
    }
  }, [validationData, fetchDataAndListen, fetchReportsData]); // Include fetchDataAndListen in dependencies

  return { error, message, update, isLoading };
};

export default useFetchAndListen;

import { useEffect, useState, useCallback } from "react";
import IMessageProp from "../interface/IMessageProp";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface FetchDataResponse {
  jobId?: string; // Define the expected shape of your response
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
  const [jobId, setJobId] = useState<string | null>(null);
  const [bodyData, setBodyData] = useState();

  const location = useLocation();

  useEffect(() => {
    setBodyData({ ...location.state, average_revenue: 19000 });
  }, [location]);

  // Memoized function to fetch the jobId, using useCallback to avoid unnecessary re-creation
  const getJobId = useCallback(async () => {
    setIsLoading(true); // Set loading to true while fetching the jobId
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

      if (responseData.jobId) {
        console.log("Fetched Job ID Successfully:", responseData.jobId);
        setJobId(responseData.jobId); // Save the jobId to state
      } else {
        throw new Error("Job ID not found in the response.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError({
        type: "progress",
        message: "An error occurred while fetching the job ID.",
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [bodyData]); // Only memoize if requestBody changes

  // Function to listen to the event source for updates based on jobId
  const fetchDataAndListen = (jobId: string) => {
    const eventSource = new EventSource(
      `https://sitegrade.heatmapcore.com/api/progress/${jobId}`
    );

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        setError({ type: "progress", message: "Listening connection closed" });
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

      // Check for stopping conditions
      if (
        parsedData?.status === "completed" &&
        parsedData?.process_stage === "report_generation"
      ) {
        setUpdate("Finishing up...");
        eventSource.close(); // Stop the EventSource
        console.log("Listening has ended.");

        let fetchAttempts = 0; // Track the number of fetch attempts

        const fetchData = async () => {
          try {
            const response = await axios.get<IMessageProp[]>(
              `https://sitegrade.heatmapcore.com/api/reports/${parsedData.id}`
            );

            const fetchedData = response.data;

            if (fetchedData[0].site_audit_s3_uri) {
              // console.log("Fetched data:", fetchedData[0]);
              setMessage(fetchedData[0]);
              return true; // Data is found, return true to stop the attempts
            } else {
              console.log("No site_audit_s3_uri found, retrying...");
              return false; // No data found, continue retrying
            }
          } catch (error) {
            console.log("Error while getting reports ", error);
            return false; // On error, continue retrying
          }
        };
        const retryFetch = async () => {
          const result = await fetchData();
          if (result) {
            return; // Exit if the data was found
          }

          fetchAttempts++; // Increment attempt counter
          if (fetchAttempts < 3) {
            console.log(`Retry ${fetchAttempts}...`);
            setTimeout(retryFetch, 10 * 60 * 1000); // Retry every 1 minute
          } else {
            console.error("Failed to fetch site audit after 3 attempts.");
            setError({ type: "report", message: "Unable to get reports data" });
          }
        };

        // Initial fetch attempt
        await retryFetch();
      }
    };

    return () => {
      eventSource.close(); // Clean up on unmount or when jobId changes
      console.log("Listening connection closed on cleanup.");
    };
  };

  // Effect for fetching the jobId only once on mount
  useEffect(() => {
    if (!jobId) {
      getJobId(); // Fetch the job ID if it's not already fetched
    }
  }, [jobId, getJobId]); // Effect runs when requestBody or jobId changes

  // Effect to start listening to the EventSource only when jobId is available
  useEffect(() => {
    if (jobId) {
      const cleanupListener = fetchDataAndListen(jobId); // Start listening once jobId is available

      return cleanupListener; // Cleanup when component unmounts or jobId changes
    }
  }, [jobId]); // Dependency on jobId

  return { error, message, update, isLoading };
};

export default useFetchAndListen;

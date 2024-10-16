import { useEffect, useState, useCallback } from "react";
import IMessageProp from "../interface/IMessageProp";
import { useLocation } from "react-router-dom";

interface FetchDataResponse {
  jobId?: string; // Define the expected shape of your response
}

const gradingUrl = "https://sitegrade.heatmapcore.com/api/validate";

const useFetchAndListen = () => {
  const [message, setMessage] = useState<IMessageProp | null>(null);
  const [update, setUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      setError("An error occurred while fetching the job ID.");
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
        setError("Listening connection closed");
        setUpdate(null);
      } else {
        setError("Listening encountered an error, Retrying...");
        setUpdate(null);
      }
    };

    eventSource.onmessage = (sourceMessage) => {
      const parsedData = JSON.parse(sourceMessage.data);
      setUpdate("Getting insight...");
      setError(null);
      setMessage(parsedData);
      console.log(parsedData);

      // Check for stopping conditions
      if (
        parsedData?.ai_insight_s3_uri &&
        parsedData?.process_stage === "report_generation"
      ) {
        setUpdate("Finishing up...");
        eventSource.close(); // Stop the EventSource
        console.log(parsedData);
        console.log("Listening has ended.");
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

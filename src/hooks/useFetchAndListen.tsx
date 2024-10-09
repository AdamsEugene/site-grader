import { useEffect, useState, useRef } from "react";

interface FetchDataResponse {
  jobId?: string; // Define the expected shape of your response
}

export interface MessageProp {
  url?: string;
  id?: string;
  status?: string;
  timestamp?: string;
  process_stage?: string;
  ai_insight_s3_uri?: string;
  screenshot_s3_uri?: string;
  cnn_s3_uri?: string;
}

const useFetchAndListen = (url: string, requestBody: object) => {
  const [message, setMessage] = useState<MessageProp | null>(null);
  const [update, setUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const fetchDataAndListen = async () => {
      console.log("Fetching...");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData: FetchDataResponse = await response.json();

        if (responseData.jobId) {
          console.log("Fetched Data Successfully. Listening...:");

          const eventSource = new EventSource(
            `https://sitegrade.heatmapcore.com/api/progress/${responseData.jobId}`
          );
          eventSourceRef.current = eventSource;

          eventSource.onerror = () => {
            if (eventSource.readyState === EventSource.CLOSED) {
              setError("EventSource connection closed");
              setUpdate(null);
            } else {
              setError("EventSource encountered an error, Retrying...");
              setUpdate(null);
            }
          };

          eventSource.onmessage = (sourceMessage) => {
            const parsedData = JSON.parse(sourceMessage.data);
            setUpdate("Getting insight...");
            setError(null);
            setMessage(parsedData);

            // Check for stopping conditions
            if (
              parsedData?.ai_insight_s3_uri &&
              parsedData?.process_stage === "report_generation"
            ) {
              console.log("Final Data: ", parsedData);
              setUpdate("Finishing up...");
              eventSource.close(); // Stop the EventSource
              eventSourceRef?.current?.close();
              eventSourceRef.current = null; // Reset reference
              console.log("Listening has ended.");
            }
          };
        } else {
          setError("Job ID not found in the response.");
          setUpdate(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching data.");
        setUpdate(null);
      }
    };

    fetchDataAndListen();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("EventSource connection closed on cleanup.");
        setError("EventSource connection closed on cleanup.");
        setUpdate(null);
      }
    };
  }, [url, requestBody]); // Only depend on url and requestBody

  return { error, message, update };
};

export default useFetchAndListen;

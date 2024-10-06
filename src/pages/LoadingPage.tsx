import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppProgressBar from "../components/AppProgressBar";

export default function LoadingPage() {
  const location = useLocation();

  // Destructure the form data passed via state
  const {
    url = "",
    product_service = "Default Product Service",
    average_revenue = 0,
    email = "",
  } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const submitData = async () => {
      if (!url) {
        setError("URL is required");
        return;
      }

      // Declare eventSource here
      let eventSource: EventSource | null = null;

      try {
        // Send the initial request to the backend
        const response = await axios.post(
          "https://sitegrade.heatmapcore.com/api/validate",
          {
            site_url: url,
            product_service,
            average_revenue,
            email,
          }
        );

        // Save jobId and messageId from response
        const { jobId: newJobId } = response.data;
        setJobId(newJobId); // Save job ID for progress tracking

        // Initialize EventSource to listen for updates using the jobId
        eventSource = new EventSource(
          `https://sitegrade.heatmapcore.com/api/${newJobId}`
        );
        console.log(eventSource.onmessage);

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setProgress(data.progress); // Assuming the server sends { "progress": 50 }

          // Stop listening if progress is complete
          if (data.progress >= 100) {
            eventSource?.close(); // Close the connection when done
          }
        };

        eventSource.onerror = (err) => {
          console.error("Error in SSE:", err);
          setError("Error fetching progress updates");
          if (eventSource) {
            eventSource.close(); // Close the connection on error
          }
        };
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error:", err.message);
          setError("An error occurred while submitting data");
        } else {
          console.error("An unknown error occurred");
        }
      }

      // Cleanup function to close EventSource on component unmount
      return () => {
        if (eventSource) {
          eventSource.close(); // Close the EventSource if it exists
        }
      };
    };

    submitData();
  }, [url, product_service, average_revenue, email]);

  return (
    <div className="h-screen">
      <AppNavbar />
      <div className="m-auto grow w-1/3 flex justify-center items-center py-32 space-y-4 text-center">
        <div className="flex flex-col items-center space-y-4 w-full">
          {error && <p className="text-red-500">{error}</p>}
          <AppProgressBar
            progress={progress}
            className="rounded-full overflow-hidden w-full bg-gray-300/50"
          />
          <p className="font-semibold text-sm">CRO Hack: [Enter CRO Hack]...</p>
          <p>URL: {url}</p>
          <p>Product/Service: {product_service}</p>
          <p>Average Revenue: {average_revenue}</p>
          <p>Email: {email}</p>
          {jobId && <p className="text-gray-600">Job ID: {jobId}</p>}{" "}
          {/* Display jobId if it exists */}
        </div>
      </div>
    </div>
  );
}

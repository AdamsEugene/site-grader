import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for each item in the array
interface IReportsData {
  id: string;
  url: string;
  email: string | null;
  process_stage: string;
  status: string;
  timestamp: string;
  notes: string | null;
  ai_insight_s3_uri: string;
  screenshot_s3_uri: string;
  cnn_s3_uri: string;
  site_speed_s3_uri: string;
  site_audit_s3_uri: string;
}

// Define the response type from the API
interface FetchDataResponse {
  data: IReportsData[];
}

export const useReports = (endpoint: string | undefined) => {
  const [data, setData] = useState<IReportsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // States for holding the content of the additional requests
  const [siteSpeed, setSiteSpeed] = useState<string | null>(null);
  const [codeQuality, setCodeQuality] = useState<string | null>(null);

  //   const endpoint =
  //     "https://sitegrade.heatmapcore.com/api/reports/97eb96c5-bf40-492d-af8e-b9e1c71060a0";

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch the main data
        const response = await axios.get<FetchDataResponse>(endpoint);
        const fetchedData = response.data.data;

        setData(fetchedData);

        // Now make the additional requests for each data item's site_speed_s3_uri and site_audit_s3_uri
        for (const item of fetchedData) {
          if (item.site_speed_s3_uri) {
            try {
              const siteSpeedResponse = await axios.get(item.site_speed_s3_uri);
              setSiteSpeed(siteSpeedResponse.data);
            } catch (error) {
              console.error("Failed to fetch site speed:", error);
              setError("Failed to fetch site speed");
            }
          }

          if (item.site_audit_s3_uri) {
            try {
              const siteAuditResponse = await axios.get(item.site_audit_s3_uri);
              setCodeQuality(siteAuditResponse.data);
            } catch (error) {
              console.error("Failed to fetch code quality:", error);
              setError("Failed to fetch code quality");
            }
          }
        }
      } catch {
        setError("Something went wrong while fetching the main data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error, siteSpeed, codeQuality };
};

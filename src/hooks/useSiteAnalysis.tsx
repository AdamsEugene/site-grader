import axios from "axios";
import { useEffect, useState } from "react";
import { MessageProp } from "./useFetchAndListen";

interface AnalysisDataProps {
  updated_at: string;
  insights: InsightProp[];
  url: string;
  id: string;
}

interface InsightProp {
  id: string;
  element_type: string;
  severity: number;
  template: string;
  selector: string;
  all_targets: { selector?: string; elementName?: string }[];
  use_targets: boolean;
  recommendation: string;
  metadata: {
    rule_id: number;
    template_id: string;
  };
  created: string;
}

// const message = {
//   url: "https://www.heatmap.com",
//   id: "81386cbd-a837-4bbc-bd47-159be8c6ed96",
//   status: "completed",
//   timestamp: "2024-10-08T16:24:18.511Z",
//   process_stage: "report_generation",
//   ai_insight_s3_uri:
//     "https://configs-node.s3.us-west-2.amazonaws.com/configs-response/alc/insights/www.heatmap.json",
//   screenshot_s3_uri:
//     "https://configs-node.s3.us-west-2.amazonaws.com/configs-response/alc/screenshots/www.heatmap",
//   cnn_s3_uri:
//     "https://configs-node.s3.us-west-2.amazonaws.com/configs-response/alc/cnnData/www.heatmap.json",
// };

const useSiteAnalysis = (message: MessageProp | null) => {
  const [data, setData] = useState<AnalysisDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysisData = async () => {
      if (message?.ai_insight_s3_uri) {
        try {
          const response = await axios.get(message.ai_insight_s3_uri);

          if (!response.data) {
            throw new Error("No data received from the API.");
          }

          // Parse the insights JSON string if it exists
          const parsedInsights = JSON.parse(response.data.insights);

          // Update the state with parsed data
          setData({ ...response.data, insights: parsedInsights });
        } catch (err) {
          console.error("Request failed", err);
          setError("An unknown error occurred.");
        }
      }
    };

    getAnalysisData();
  }, [message]);

  //   console.log(data?.insight);

  return { data, error };
};

export default useSiteAnalysis;

import axios from "axios";
import { useEffect, useState } from "react";
import IMessageProp from "../interface/IMessageProp";

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

const useSiteAnalysis = (message: IMessageProp | null) => {
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

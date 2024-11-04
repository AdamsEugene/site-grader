import axios from "axios";
import { useEffect, useState } from "react";
import IMessageProp from "../interface/IMessageProp";
import { IPSIDataResponse } from "../interface/ISiteSpeed";
import { ISiteAuditResponse } from "../interface/ICodeQuality";
// import { ISiteAuditResponse } from "../interface/ICodeQuality";

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

const useSiteAnalysis = (message: IMessageProp | null) => {
  const [data, setData] = useState<AnalysisDataProps | null>(null);
  const [siteSpeedData, setSiteSpeedData] = useState<IPSIDataResponse | null>(
    null
  );
  const [codeQualityData, setCodeQualityData] =
    useState<ISiteAuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysisData = async () => {
      if (
        message?.ai_insight_s3_uri &&
        message?.site_speed_s3_uri &&
        message?.site_audit_s3_uri
      ) {
        try {
          // Make multiple API requests
          const [insightResponse, siteSpeedResponse, codeQualityResponse] =
            await Promise.all([
              axios.get(message.ai_insight_s3_uri),
              axios.get(message.site_speed_s3_uri),
              axios.get(message.site_audit_s3_uri),
            ]);

          // Check for missing data
          if (!insightResponse.data) {
            throw new Error("No data received from the AI insight API.");
          }

          if (!siteSpeedResponse.data) {
            throw new Error("No data received from the site speed API.");
          }

          if (!codeQualityResponse.data) {
            throw new Error("No data received from the site audit API.");
          }

          // Assuming the response data is JSON, but only parse if it's a string
          const parsedInsights =
            typeof insightResponse.data.insights === "string"
              ? JSON.parse(insightResponse.data.insights)
              : insightResponse.data.insights;

          // const parsedSiteSpeed =
          //   typeof siteSpeedResponse.data.data === "string"
          //     ? JSON.parse(siteSpeedResponse.data?.data)
          //     : siteSpeedResponse.data?.data;

          // Parsing JSON strings for psi_metrics and recommendations
          const parsedPSIMetrics = siteSpeedResponse.data?.data?.psi_metrics
            ? JSON.parse(siteSpeedResponse.data?.data.psi_metrics)
            : null;

          const parsedRecommendation = siteSpeedResponse.data?.data
            ?.recommendations
            ? JSON.parse(siteSpeedResponse.data?.data?.recommendations)
            : null;

          // Parsing the site audit response from the code quality data
          const parsedCodeQuality =
            typeof codeQualityResponse.data.data.site_audit === "string"
              ? JSON.parse(codeQualityResponse.data.data.site_audit)
              : codeQualityResponse.data.data.site_audit;

          // Set the state with parsed data
          setData({
            ...insightResponse.data,
            insights: parsedInsights,
          });

          // Logging the parsed data
          setSiteSpeedData({
            ...siteSpeedResponse.data,
            data: {
              // ...siteSpeedResponse.data.data,
              psi_metrics: parsedPSIMetrics,
              recommendations: parsedRecommendation,
            },
          });

          setCodeQualityData({
            ...codeQualityResponse.data,
            data: { site_audit: parsedCodeQuality },
          });
        } catch (err) {
          // Improved error handling
          console.error("Request failed", err);
          setError("An unknown error occurred.");
        }
      } else {
        // Handle missing URIs
        setError("Missing required S3 URIs.");
      }
    };

    getAnalysisData();
  }, [message]); // Depend on message to trigger the effect when message changes

  return { data, error, siteSpeedData, codeQualityData };
};

export default useSiteAnalysis;

import { useState, useEffect } from "react";

interface AdditionalData {
  industry?: number;
  category?: number;
}

interface ApiResponse {
  result: string;
  msg: string;
  additional?: AdditionalData;
}

export default function useFetchIndustryValue(
  url: string | undefined,
  overallPercentage: number
): { industryValue: number | null; categoryValue: number | null } {
  const [industryValue, setIndustryValue] = useState<number | null>(null);
  const [categoryValue, setCategoryValue] = useState<number | null>(null);

  useEffect(() => {
    if (url && overallPercentage) {
      const endpointUrl = `https://stage1.heatmapcore.com/index.php?module=API&method=AdsIntegration.grader&websiteUrl=https://${url}&score=${overallPercentage}&revenue=$1m-$10m`;

      fetch(endpointUrl)
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.additional?.industry !== undefined) {
            setIndustryValue(data.additional.industry);
          }
          if (data.additional?.category !== undefined) {
            setCategoryValue(data.additional.category);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [url, overallPercentage]);

  return { industryValue, categoryValue };
}

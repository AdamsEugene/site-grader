import { useState, useEffect } from "react";

interface AdditionalData {
  perRevenueScore?: number;
  homePageScore?: number;
  homePageTotal?: number;
  perRevenueTotal?: number;
}

interface ApiResponse {
  result: string;
  msg: string;
  additional?: AdditionalData;
}

export default function useFetchIndustryValue(
  url: string | undefined,
  overallPercentage: number
): {
  perRevenueScore: number | null;
  homePageScore: number | null;
  homePageTotal: number | null;
  perRevenueTotal: number | null;
} {
  const [perRevenueScore, setPerRevenueScore] = useState<number | null>(null);
  const [homePageScore, setHomePageScore] = useState<number | null>(null);
  const [homePageTotal, setHomePageTotal] = useState<number | null>(null);
  const [perRevenueTotal, setPerRevenueTotal] = useState<number | null>(null);

  useEffect(() => {
    if (url && overallPercentage) {
      const endpointUrl = `https://stage1.heatmapcore.com/index.php?module=API&method=AdsIntegration.grader&websiteUrl=https://${url}&score=${overallPercentage}&revenue=$1m-$10m`;

      fetch(endpointUrl)
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.additional?.perRevenueScore !== undefined) {
            setPerRevenueScore(data.additional.perRevenueScore);
          }
          if (data.additional?.homePageScore !== undefined) {
            setHomePageScore(data.additional.homePageScore);
          }
          if (data.additional?.homePageTotal !== undefined) {
            setHomePageTotal(data.additional.homePageTotal);
          }
          if (data.additional?.perRevenueTotal !== undefined) {
            setPerRevenueTotal(data.additional.perRevenueTotal);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [url, overallPercentage]);

  return {
    perRevenueScore,
    homePageScore,
    homePageTotal,
    perRevenueTotal,
  };
}

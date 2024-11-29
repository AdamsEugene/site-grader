import { useState } from "react";
import axios from "axios";

interface ServiceRevenueDataProps {
  products_services: string;
  annual_revenue: string;
  id: string;
}

interface UseServiceRevenueReturn {
  isSuccess: boolean;
  loading: boolean;
  error: string | null;
  sendData: (data: ServiceRevenueDataProps) => void;
}

const useServiceRevenue = (): UseServiceRevenueReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const endpoint = "https://sitegrade.heatmapcore.com/api/categories";

  const sendData = async (data: ServiceRevenueDataProps) => {
    try {
      setLoading(true);
      const response = await axios.post(endpoint, data);
      setIsSuccess(response.data.message ? true : false); // Extract the relevant data from the response
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch data");
      console.error(err);
    }
  };

  return { loading, error, sendData, isSuccess };
};

export default useServiceRevenue;

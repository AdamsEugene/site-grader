import { useState, useEffect } from "react";
import axios from "axios";

interface ICategoryData {
  id: number;
  product_services: string[];
  annual_revenue: string[];
}

interface UseCategoryProductsReturn {
  data: ICategoryData | null;
  loading: boolean;
  error: string | null;
}

const useCategoryProducts = (): UseCategoryProductsReturn => {
  const [data, setData] = useState<ICategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = "https://sitegrade.heatmapcore.com/api/category-products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        setData(response.data.data[0]); // Extract the relevant data from the response
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch data");
        console.error(err);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useCategoryProducts;

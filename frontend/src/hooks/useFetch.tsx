import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

export default function useFetch<T>(
  url: string,
  config: AxiosRequestConfig | undefined = undefined
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, config);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

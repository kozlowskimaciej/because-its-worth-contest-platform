import { useEffect, useState } from "react";
import axios from "axios";

export default function useDownloadMultipleFiles(fileUrls: string[]) {
  const [data, setData] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesData = await downloadMultipleFiles(fileUrls);
        setData(filesData);
      } catch (error) {
        setError(error as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fileUrls]);

  return { data, isLoading, error };
}

export const downloadMultipleFiles = async (
  fileUrls: string[]
): Promise<File[]> => {
  const filePromises = fileUrls.map(async (url) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch file from ${url}`);
    }

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return new File([blob], url.split("/").pop()!);
  });

  return Promise.all(filePromises);
};

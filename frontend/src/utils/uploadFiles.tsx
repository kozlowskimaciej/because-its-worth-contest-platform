import axios from "axios";

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        urls.push(
          `${process.env.REACT_APP_SERVER_URL}/static/${data.filename}`
        );
      } else {
        console.error(
          `Failed to upload file ${file.name}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error during file upload for ${file.name}:`, error);
    }
  });

  await Promise.all(uploadPromises);

  return urls;
};

export const uploadSingleFile = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/uploads`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      return `${process.env.REACT_APP_SERVER_URL}/static/${data.filename}`;
    } else {
      console.error(
        `Failed to upload file ${file.name}: ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Error during file upload for ${file.name}:`, error);
    return null;
  }
};

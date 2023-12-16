import React, { useState } from "react";
import styles from "./styles/ContestCreationForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ParticipantsCategory from "./ParticipantsCategory";
import ContestFilesInput from "./ContestFilesInput";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import DeadlineInput from "./DeadlineInput";
import ContestCategorySelector from "./ContestCategorySelector";
import FileFormatsSelector from "./FileFormatsSelector";
import axios from "axios";

interface IProps {
  initialValues: {
    title: string;
    description: string;
    deadline: Date;
    contestCategory: string;
    entryCategories: string[];
    formats: string[];
  };
}

export default function ContestCreationForm({ initialValues }: IProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [participants, setParticipants] = useState<string[]>(
    initialValues.entryCategories
  );
  const [fileFormats, setFileFormats] = useState<string[]>(
    initialValues.formats
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          urls.push(data.filename);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("participants", JSON.stringify(participants));
    formData.append("formats", JSON.stringify(fileFormats));
    files.forEach((file) => {
      formData.append("files", file);
    });

    const urls = await uploadFiles();
    console.log("urls: ");

    urls.forEach((url) => console.log(url));

    if (id) console.log(`Will modify contest of id: ${id}`);
    else console.log("Will create new contest");

    formData.forEach((val, key) => {
      console.log(key, val);
    });

    navigate("/contests");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div style={{ textAlign: "left" }}>
        <TitleInput initial={initialValues.title} />
        <DescriptionInput initial={initialValues.description} />
        <DeadlineInput initial={initialValues.deadline} />
        <ContestFilesInput files={files} setFiles={setFiles} />
        <ContestCategorySelector initial={initialValues.contestCategory} />
        <ParticipantsCategory
          participants={participants}
          setParticipants={setParticipants}
        />
        <FileFormatsSelector
          fileFormats={fileFormats}
          setFileFormats={setFileFormats}
        />
      </div>
      <button type="submit" className={styles.button}>
        {id ? "zapisz zmiany" : "utwórz"}
      </button>
    </form>
  );
}

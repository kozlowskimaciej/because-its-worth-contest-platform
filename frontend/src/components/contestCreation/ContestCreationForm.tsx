import React, { useState } from "react";
import styles from "./styles/ContestCreationForm.module.css";
import { useNavigate } from "react-router-dom";
import ParticipantsCategory from "./ParticipantsCategory";
import ContestFilesInput from "./ContestFilesInput";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import DeadlineInput from "./DeadlineInput";
import ContestCategorySelector from "./ContestCategorySelector";
import FileFormatsSelector from "./FileFormatsSelector";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("participants", JSON.stringify(participants));
    formData.append("formats", JSON.stringify(fileFormats));
    files.forEach((file) => {
      formData.append("files", file);
    });
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
        utwórz
      </button>
    </form>
  );
}

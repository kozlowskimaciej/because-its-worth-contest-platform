import React, { useState } from "react";
import styles from "./styles/ContestCreationForm.module.css";
import { useParams } from "react-router-dom";
import ParticipantsCategory from "./ParticipantsCategory";
import ContestFilesInput from "./ContestFilesInput";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import DeadlineInput from "./DeadlineInput";
import ContestCategorySelector from "./ContestCategorySelector";
import FileFormatsSelector from "./FileFormatsSelector";
import axios from "axios";
import BackgroundSelector from "./BackgroundSelector";
import { uploadMultipleFiles, uploadSingleFile } from "../../utils/uploadFiles";

interface IProps {
  initialValues: {
    title: string;
    description: string;
    deadline: Date;
    contestCategory: string;
    entryCategories: string[];
    formats: string[];
  };
  setCreatedContestID?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ContestCreationForm({
  initialValues,
  setCreatedContestID,
}: IProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [background, setBackground] = useState<File | null>(null);
  const [participants, setParticipants] = useState<string[]>(
    initialValues.entryCategories
  );
  const [fileFormats, setFileFormats] = useState<string[]>(
    initialValues.formats
  );
  const { id } = useParams();

  // const uploadFiles = async (): Promise<string[]> => {
  //   const urls: string[] = [];

  //   const uploadPromises = files.map(async (file) => {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_SERVER_URL}/uploads`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const data = response.data;
  //         urls.push(
  //           `${process.env.REACT_APP_SERVER_URL}/static/${data.filename}`
  //         );
  //       } else {
  //         console.error(
  //           `Failed to upload file ${file.name}: ${response.statusText}`
  //         );
  //       }
  //     } catch (error) {
  //       console.error(`Error during file upload for ${file.name}:`, error);
  //     }
  //   });

  //   await Promise.all(uploadPromises);

  //   return urls;
  // };

  const createContest = (
    formData: FormData,
    urls: string[],
    backgroundURL: string | null
  ) => {
    const body = {
      name: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("type"),
      entryCategories: participants,
      published: false,
      deadline: formData.get("date") + "T00:00:00.000Z",
      termsAndConditions: urls,
      acceptedFileFormats: fileFormats,
      background: backgroundURL,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/contests`, body)
      .then((data) => setCreatedContestID && setCreatedContestID(data.data.id))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("participants", JSON.stringify(participants));
    formData.append("formats", JSON.stringify(fileFormats));
    files.forEach((file) => {
      formData.append("files", file);
    });

    const urls = await uploadMultipleFiles(files);
    const backgroundURL = background
      ? await uploadSingleFile(background)
      : null;

    if (id) console.log(`Will modify contest of id: ${id}`);
    else createContest(formData, urls, backgroundURL);
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
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
      </div>
      <button type="submit" className={styles.button}>
        {id ? "Zapisz zmiany" : "Utwórz"}
      </button>
    </form>
  );
}

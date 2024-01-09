import React from "react";
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
import { useContestCreationFormContext } from "../../contexts/ContestCreationFormContext";
import { validateContestForm } from "./utils/validate";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../config/toasts";

interface IProps {
  setCreatedContestID?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ContestCreationForm({ setCreatedContestID }: IProps) {
  const { initialValues, participants, fileFormats, files, background } =
    useContestCreationFormContext();
  const { id } = useParams();

  const prepareBody = (
    formData: FormData,
    urls: string[],
    backgroundURL: string | null
  ) => ({
    name: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("type"),
    entryCategories: participants,
    published: false,
    deadline: formData.get("date") + "T00:00:00.000Z",
    termsAndConditions: urls,
    acceptedFileFormats: fileFormats,
    background: backgroundURL,
  });

  const createContest = (
    formData: FormData,
    urls: string[],
    backgroundURL: string | null
  ) => {
    const body = prepareBody(formData, urls, backgroundURL);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/contests`, body, {
        withCredentials: true,
      })
      .then((data) => setCreatedContestID && setCreatedContestID(data.data.id))
      .catch((err) => console.error(err));
  };

  const updateContest = (
    formData: FormData,
    urls: string[],
    backgroundURL: string | null
  ) => {
    const body = prepareBody(formData, urls, backgroundURL);

    const toastID = toast.loading("Proszę czekać...");

    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/contests/?id=${id}`, body, {
        withCredentials: true,
      })
      .then(() =>
        toast.update(toastID, successConfig("Konkurs zmodyfikowany pomyślnie."))
      )
      .catch(() =>
        toast.update(
          toastID,
          errorConfig("Wystąpił błąd podczas modyfikowania konkursu.")
        )
      );
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

    formData.append("urls", JSON.stringify(urls));
    formData.append("backgroundURL", String(backgroundURL));

    const isValid = validateContestForm(formData, { withToasts: true });
    if (!isValid) return;

    if (id) updateContest(formData, urls, backgroundURL);
    else createContest(formData, urls, backgroundURL);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div style={{ textAlign: "left" }}>
        <TitleInput initial={initialValues.title} />
        <DescriptionInput initial={initialValues.description} />
        <DeadlineInput initial={initialValues.deadline} />
        <ContestFilesInput />
        <ContestCategorySelector initial={initialValues.contestCategory} />
        <ParticipantsCategory />
        <FileFormatsSelector />
        <BackgroundSelector />
      </div>
      <button type="submit" className={styles.button}>
        {id ? "Zapisz zmiany" : "Utwórz"}
      </button>
    </form>
  );
}

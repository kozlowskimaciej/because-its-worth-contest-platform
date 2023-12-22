import React from "react";
import styles from "./styles/PublishForm.module.css";
import { useParams } from "react-router-dom";
import FileInput from "./FileInput";
import FilesDisplayer from "./FilesDisplayer";
import { usePublishContext } from "../../contexts/PublishContext";
import { uploadMultipleFiles } from "../../utils/uploadFiles";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../config/toasts";

export default function PublishForm() {
  const { files } = usePublishContext();
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastID = toast.loading("Proszę czekać...");

    try {
      const urls = await uploadMultipleFiles(files);
      const formLink = `${window.origin}/forms/${id}`;

      console.log(urls, formLink);
      toast.update(toastID, successConfig("Konkurs opublikowany pomyślnie."));
    } catch (e) {
      toast.update(
        toastID,
        errorConfig("Wystąpił błąd podczas publikownia konkursu.")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FileInput />
      <FilesDisplayer />
      <div style={{ width: "100%", textAlign: "center" }}>
        <button type="submit" className={styles.button}>
          Wyślij
        </button>
      </div>
    </form>
  );
}

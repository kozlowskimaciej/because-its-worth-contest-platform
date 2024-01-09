import React from "react";
import styles from "./styles/PublishForm.module.css";
import { useParams } from "react-router-dom";
import FileInput from "./FileInput";
import FilesDisplayer from "./FilesDisplayer";
import { usePublishContext } from "../../contexts/PublishContext";
import { uploadMultipleFiles } from "../../utils/uploadFiles";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../config/toasts";
import axios from "axios";

export default function PublishForm() {
  const { files } = usePublishContext();
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.warning("Wybierz co najmniej jeden plik.");
      return;
    }

    const toastID = toast.loading("Proszę czekać...");

    try {
      const urls = (await uploadMultipleFiles(files)).map((filename) => {
        const splitted = filename.split("/");
        return splitted[splitted.length - 1];
      });
      const formLink = `${window.origin}/forms/${id}`;

      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/contests/${id}/publish`,
        {
          receiver_files: urls,
          form_url: formLink,
        },
        {
          withCredentials: true,
        }
      );

      if (data.status !== 200) throw new Error();
      toast.update(toastID, successConfig("Konkurs opublikowany pomyślnie."));
    } catch (e) {
      toast.update(
        toastID,
        errorConfig("Wystąpił błąd podczas publikownia konkursu.")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`container ${styles.form}`}>
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

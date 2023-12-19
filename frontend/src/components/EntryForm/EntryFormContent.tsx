import React, { CSSProperties } from "react";
import { Contest } from "../../models/Contest";
import axios from "axios";
import styles from "./styles/EntryFormContent.module.css";
import EntryFiles from "./EntryFiles";
import { uploadMultipleFiles } from "../../utils/uploadFiles";
import SingleEntry from "./SingleEntry";
import { useEntryFormContext } from "../../contexts/EntryFormContext";
import CategorySelector from "./CategorySelector";

interface IProps {
  contest: Contest;
}

export default function EntryFormContent({ contest }: IProps) {
  const { files, entryFormRef, submitButtonRef } = useEntryFormContext();

  // some hook for this
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const urls = await uploadMultipleFiles(files);
    console.log("urls:", urls);

    const payload = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      guardianFirstName: "Nie",
      guardianLastName: "istnieje",
      phone: "694202137",
      email: "someemail@email.com",
      address: formData.get("place"),
      submissionDate: new Date(),
      attachments: urls,
      place: "none",
      contestId: contest.id,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/entries`, payload)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const formStyles: CSSProperties = {
    background: contest.background
      ? `url(${contest.background})`
      : `var(--secondary-color)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <form
      className={styles.form}
      style={formStyles}
      onSubmit={handleSubmit}
      ref={entryFormRef}
    >
      <h2>Karta zgłoszeniowa do konkursu "{contest.name}"</h2>
      <div style={{ textAlign: "left" }}>
        <SingleEntry
          entryTitle="Imie"
          name="firstname"
          required
          type="text"
          placeholder="Podaj imię..."
        />
        <SingleEntry
          entryTitle="Nazwisko"
          name="lastname"
          required
          type="text"
          placeholder="Podaj nazwisko..."
        />
        <SingleEntry
          entryTitle="Placówka"
          name="place"
          required
          type="text"
          placeholder="Podaj placówkę..."
        />
        <EntryFiles acceptedFormats={contest.acceptedFileFormats} />
        <CategorySelector categories={contest.entryCategories} />
      </div>
      <button className={styles.submit} type="submit" ref={submitButtonRef}>
        Wyślij
      </button>
    </form>
  );
}

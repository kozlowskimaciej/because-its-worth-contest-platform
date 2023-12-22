import React, { CSSProperties } from "react";
import { Contest } from "../../models/Contest";
import axios from "axios";
import styles from "./styles/EntryFormContent.module.css";
import EntryFiles from "./EntryFiles";
import { uploadMultipleFiles } from "../../utils/uploadFiles";
import SingleEntry from "./SingleEntry";
import { useEntryFormContext } from "../../contexts/EntryFormContext";
import CategorySelector from "./CategorySelector";
import { toast } from "react-toastify";
import { errorConfig, loadingConfig, successConfig } from "../../config/toasts";

interface IProps {
  contest: Contest;
}

export default function EntryFormContent({ contest }: IProps) {
  const { files, entryFormRef, submitButtonRef, handleSuccessfulSubmit } =
    useEntryFormContext();

  // some hook for this
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const urls = await uploadMultipleFiles(files);

    let isAnyError = false;

    if (urls.length === 0) {
      toast.warning("Załącz przynajmniej jeden plik.");
      isAnyError = true;
    }

    if (!formData.get("type")) {
      toast.warning("Wybierz swoją kategorię.");
      isAnyError = true;
    }

    if (isAnyError) return;

    const toastID = toast.loading("Proszę czekać...", loadingConfig());

    const guardian = formData.get("guardian") as string;
    const [gurdianName, guardianLastname] = guardian.split(" ");

    const isValidGuardian = gurdianName && guardianLastname;

    const payload = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      guardianFirstName: isValidGuardian ? gurdianName : null,
      guardianLastName: isValidGuardian ? guardianLastname : null,
      phone: formData.get("phone") || null,
      email: formData.get("email") || null,
      address: formData.get("place") || null,
      submissionDate: new Date(),
      attachments: urls,
      place: "none",
      contestId: contest.id,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/entries`, payload)
      .then((data) => {
        if (data.status !== 200) throw new Error();
        toast.update(toastID, successConfig("Praca zgłoszona pomyślnie."));
        handleSuccessfulSubmit();
      })
      .catch((err) => {
        toast.update(
          toastID,
          errorConfig("Wystąpił błąd podczas zgłaszania pracy.")
        );
      });
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
        <SingleEntry entryTitle="Imie" name="firstname" required type="text" />
        <SingleEntry
          entryTitle="Nazwisko"
          name="lastname"
          required
          type="text"
        />
        <SingleEntry
          entryTitle="Placówka  (opcjonalne)"
          name="place"
          type="text"
        />
        <SingleEntry
          entryTitle="Opiekun  (opcjonalne)"
          name="guardian"
          type="text"
        />
        <SingleEntry
          entryTitle="Nr telefonu  (opcjonalne)"
          name="phone"
          type="text"
        />
        <SingleEntry
          entryTitle="Adres email (opcjonalne)"
          name="email"
          type="email"
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

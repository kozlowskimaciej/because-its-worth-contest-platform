import React, { useState } from "react";
import { Contest } from "../../models/Contest";
import axios from "axios";
import styles from "./styles/EntryFormContent.module.css";

interface IProps {
  contest: Contest;
}

export default function EntryFormContent({ contest }: IProps) {
  const [files, setFiles] = useState<File[]>([]);

  const formattedFileFormats = contest.acceptedFileFormats
    .map((format) => `.${format}`)
    .join(", ");

  const uploadFiles = async (): Promise<string[]> => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const urls = await uploadFiles();
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

  const handleFilesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...filesArray]);
  };

  return (
    <form
      id="entry-form"
      className={styles.form}
      style={{
        background: contest.background
          ? `url(${contest.background})`
          : `var(--secondary-color)`,
      }}
      onSubmit={handleSubmit}
    >
      <h2>Karta zgłoszeniowa do konkursu "{contest.name}"</h2>
      <div style={{ textAlign: "left" }}>
        <div className={styles.entry}>
          <label htmlFor="entry-firstname">Imie</label>
          <input type="text" id="entry-firstname" name="firstname" required />
        </div>
        <div className={styles.entry}>
          <label htmlFor="entry-lastname">Nazwisko</label>
          <input type="text" id="entry-lastname" name="lastname" required />
        </div>
        <div className={styles.entry}>
          <label htmlFor="entry-place">Placówka</label>
          <input type="text" id="entry-place" name="place" />
        </div>
        <div id="entry-form-file-input">
          <input
            type="file"
            multiple
            id="entry-files"
            name="files"
            accept={formattedFileFormats}
            style={{ display: "none" }}
            onChange={handleFilesInput}
          />
          <label className={styles.files} htmlFor="entry-files">
            <img src={`${process.env.PUBLIC_URL}/icons/plus.svg`} alt="" />
            <span>Załącz pliki</span>
          </label>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: "50px" }}>
          <label>Wybierz swoją kategorię</label>
          <br />
          {contest.entryCategories.map((category, index) => (
            <React.Fragment key={index}>
              <input type="radio" value={category} name="type" /> {category}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <button className={styles.submit} type="submit" id="entry-form-submit">
        Wyślij
      </button>
    </form>
  );
}

import React, { useState } from "react";
import { Contest } from "../../models/Contest";
import axios from "axios";

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

    formData.forEach((val, key) => {
      console.log(key, val);
    });
  };

  const handleFilesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...filesArray]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="entry-firstname">imie</label>
        <input type="text" id="entry-firstname" name="firstname" required />
      </div>
      <div>
        <label htmlFor="entry-lastname">nazwisko</label>
        <input type="text" id="entry-lastname" name="lastname" required />
      </div>
      <div>
        <label htmlFor="entry-birthdate">data urodzenia</label>
        <input type="date" id="entry-birthdate" name="birthdate" required />
      </div>
      <div>
        <label htmlFor="entry-place">placówka</label>
        <input type="text" id="entry-place" name="place" />
      </div>
      <div>
        <input
          type="file"
          multiple
          id="entry-files"
          name="files"
          accept={formattedFileFormats}
          style={{ display: "none" }}
          onChange={handleFilesInput}
        />
        <label htmlFor="entry-files">załącz pliki</label>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>wybierz swoją kategorię</label>
        <br />
        {contest.entryCategories.map((category, index) => (
          <React.Fragment key={index}>
            <input type="radio" value={category} name="type" /> {category}
            <br />
          </React.Fragment>
        ))}
      </div>
      <button type="submit">wyślij</button>
    </form>
  );
}

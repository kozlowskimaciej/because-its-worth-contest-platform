import React from "react";
import styles from "./styles/ContestPreview.module.css";
import { useNavigate } from "react-router-dom";
import { Contest } from "../../models/Contest";
import { formatDate } from "./utils/formatDate";
import ControlButtons from "./ControlButtons";
import InfoSection from "./InfoSection";
import FileListSection from "./FileListSection";
import ListSection from "./ListSection";
import FormLinkSection from "./FormLinkSection";
import useDeleteContest from "./utils/deleteContest";

interface IProps {
  contest: Contest;
}

export default function ContestPreview({ contest }: IProps) {
  const { deleteContest } = useDeleteContest(contest.id);
  const navigate = useNavigate();

  const controlButtons = [
    {
      text: "Opublikuj",
      class: styles.publish,
      onClick: () => navigate(`/contests/${contest.id}/publish`),
    },
    {
      text: "Modyfikuj",
      class: styles.publish,
      onClick: () => navigate(`/contests/${contest.id}/modify`),
    },
    {
      text: "Usuń konkurs",
      class: styles.delete,
      onClick: () => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten konkurs?")) return;
        deleteContest();
      },
    },
  ];

  return (
    <div className={`container ${styles.wrapper}`}>
      <ControlButtons controlButtons={controlButtons} />
      <div className={styles.info}>
        <InfoSection
          title="Tytuł"
          content={{ styles: styles.entry, text: contest.name }}
        />
        <InfoSection
          title="Opis"
          content={{ styles: styles.entry, text: contest.description }}
        />
        <InfoSection
          title="Data zakończenia"
          content={{ styles: styles.entry, text: formatDate(contest.deadline) }}
        />
        <FileListSection
          title="Pliki z regulaminem"
          files={contest.termsAndConditions}
        />
        <ListSection title="Kategoria konkursu" content={[contest.category]} />
        <ListSection
          title="Formaty plików"
          content={contest.acceptedFileFormats}
        />
        <FormLinkSection id={contest.id} />
      </div>
    </div>
  );
}

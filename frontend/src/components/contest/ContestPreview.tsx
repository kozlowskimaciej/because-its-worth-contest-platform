import React from "react";
import styles from "./styles/ContestPreview.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { prepareContests } from "../Contests/utils/prepareContests";
import { contests as apiContests } from "../../fakeApi/contests";
import NotFoundInfo from "../notFound/NotFoundInfo";

export default function ContestPreview() {
  const navigate = useNavigate();
  const { id } = useParams();

  const formatDate = (inputDate: Date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(inputDate);

    return date.toLocaleDateString("pl-PL", options as any);
  };

  const contests = prepareContests(apiContests);
  const matchingContest = contests.filter((contest) => contest.id === id);

  if (matchingContest.length === 0) {
    return <NotFoundInfo />;
  }

  const contest = matchingContest[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles["btn-wrapper"]}>
        <button
          className={styles.publish}
          onClick={() => navigate(`/contests/${contest.id}/publish`)}
        >
          opublikuj
        </button>
        <button className={styles.delete}>usuń konkurs</button>
      </div>
      <div className={styles.info}>
        <div>
          <h3>tytuł</h3>
          <p className={styles.entry}>{contest.name}</p>
        </div>
        <div>
          <h3>opis</h3>
          <p className={styles.entry}>{contest.description}</p>
        </div>
        <div>
          <h3>data zakończenia</h3>
          <p className={styles.entry}>{formatDate(contest.deadline)}</p>
        </div>
        <div>
          <h3>pliki z regulaminem</h3>
          <ul>
            {contest.termsAndConditions.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>kategorie</h3>
          <ul>
            {contest.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formaty plików</h3>
          <ul>
            {contest.acceptedFileFormats.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>formularz zgłoszeniowy</h3>
          <a href={`http://foundation.com/forms/${contest.id}`} target="_blank">
            {`http://foundation.com/forms/${contest.id}`}
          </a>
        </div>
      </div>
    </div>
  );
}

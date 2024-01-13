import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../config/toasts";
import styles from "./styles/FinishButton.module.css";

export default function FinishButton() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFinishContest = () => {
    if (!window.confirm("Czy na pewno chcesz zakończyć ten konkurs?")) return;

    const toastID = toast.loading("Proszę czekać...");

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/contests/${id}/end`,
        {},
        { withCredentials: true }
      )
      .then((data) => {
        if (data.status !== 200) throw new Error();
        toast.update(toastID, successConfig("Konkurs zakończony pomyślnie."));
        navigate(`/contests/${id}/preview`);
      })
      .catch(() => {
        toast.update(
          toastID,
          errorConfig("Wystąpił błąd podczas zakończenia konkursu.")
        );
      });
  };
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <button className={styles.button} onClick={handleFinishContest}>
        Zakończ konkurs
      </button>
    </div>
  );
}

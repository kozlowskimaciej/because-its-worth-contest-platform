import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/RateButton.module.css";

export default function RateButton() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <button
      className={styles.button}
      onClick={() => navigate(`/contests/${id}/rate`)}
    >
      Przeglądaj prace
    </button>
  );
}

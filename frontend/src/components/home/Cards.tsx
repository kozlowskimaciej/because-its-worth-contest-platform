import React from "react";
import styles from "./styles/Cards.module.css";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Przeglądaj Konkursy",
      description:
        "Przeglądaj i dowiedz się więcej o dostępnych konkursach. Oceniaj i komentuj swoje ulubione.",
      image: `${process.env.PUBLIC_URL}/images/card1.jpg`,
      onclick: () => navigate("/contests"),
    },
    {
      title: "Twórz Nowe Konkursy",
      description:
        "Rozpocznij swoją własną przygodę konkursową. Dodawaj swoje wyzwania i zapraszaj innych do udziału.",
      image: `${process.env.PUBLIC_URL}/images/card2.jpg`,
      onclick: () => navigate("/contest/new"),
    },
  ];

  return (
    <div className={`container ${styles.wrapper}`}>
      {cards.map((card, index) => (
        <button key={index} onClick={card.onclick} className={styles.card}>
          <h3 className={styles.title}>{card.title}</h3>
          <div className={styles.content}>
            <img src={card.image} alt="" className={styles.image} />
            <p className={styles.description}>{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

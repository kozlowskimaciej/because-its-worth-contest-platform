import React from "react";
import ContestGroup from "./ContestGroup";
import { useNavigate } from "react-router-dom";

export default function Contests() {
  const navigate = useNavigate();

  const activeContests = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Kreatywna Eksplozja Barw`,
    description: `Zapraszamy wszystkich pasjonatów sztuki i kreatywności do udziału w naszym ekscytującym konkursie "Kreatywna Eksplozja Barw". Celem konkursu jest wyrażenie swojej wyjątkowej wizji poprzez kolor i formę. Zadaniem uczestników jest stworzenie dzieła sztuki, które wyróżnia się ...`,
    onclick: () => navigate(`/contests/${index + 1}/preview`),
  }));

  return (
    <div>
      <ContestGroup title="W trakcie" items={activeContests} />
      <ContestGroup title="Zakończone" items={activeContests} />
    </div>
  );
}

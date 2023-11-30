import React from "react";
import ContestGroup from "./ContestGroup";

export default function Contests() {
  const activeContests = new Array(10).fill({
    id: 1,
    title: "Kreatywna Eksplozja Barw",
    description: `Zapraszamy wszystkich pasjonatów sztuki i kreatywności do udziału w naszym ekscytującym konkursie "Kreatywna Eksplozja Barw". Celem konkursu jest wyrażenie swojej wyjątkowej wizji poprzez kolor i formę. Zadaniem uczestników jest stworzenie dzieła sztuki, które wyróżnia się ...`,
  });

  return (
    <div>
      <ContestGroup title="W trakcie" items={activeContests} />
      <ContestGroup title="Zakończone" items={activeContests} />
    </div>
  );
}

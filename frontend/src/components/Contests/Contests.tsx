import React from "react";
import ContestGroup from "./ContestGroup";
import { useNavigate } from "react-router-dom";
import { prepareContests } from "../../utils/prepareContests";
import { contests as apiContests } from "../../fakeApi/contests";

export default function Contests() {
  const navigate = useNavigate();

  const contests = prepareContests(apiContests);

  contests.forEach((contest) => {
    if (contest.description.length > 300) {
      contest.description = contest.description.slice(0, 300) + "...";
    }
  });

  const active = contests.filter((contest) => new Date() <= contest.deadline);
  active.forEach((contest: any) => {
    contest.onclick = () => navigate(`/contests/${contest.id}/preview`);
  });

  const finished = contests.filter((contest) => new Date() > contest.deadline);
  finished.forEach((contest: any) => {
    contest.onclick = () => navigate(`/contests/${contest.id}/rate`);
  });

  return (
    <div>
      <ContestGroup title="W trakcie" items={active as any} />
      <ContestGroup title="Zakończone" items={finished as any} />
    </div>
  );
}

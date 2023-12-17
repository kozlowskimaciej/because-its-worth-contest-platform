import React from "react";
import ContestGroup from "./ContestGroup";
import { useNavigate } from "react-router-dom";
import { prepareContests } from "../../utils/prepareContests";
import useFetch from "../../hooks/useFetch";
import Loading from "../common/Loading";

export default function Contests() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests`
  );

  if (isLoading) return <Loading text="" />;
  if (error) return <div>error</div>;

  const contests = prepareContests(data);

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

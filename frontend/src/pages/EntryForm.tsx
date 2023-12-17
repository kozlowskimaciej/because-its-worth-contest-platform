import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { prepareSingleContest } from "../utils/prepareContests";
import EntryFormContent from "../components/EntryForm/EntryFormContent";

export default function EntryForm() {
  const { id } = useParams();

  const { data, error, isLoading } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const contest = prepareSingleContest(data.data);

  if (contest.deadline < new Date()) {
    return <div>termin zgłaszania minął</div>;
  }

  return (
    <>
      <button onClick={window.print}>drukuj</button>
      <EntryFormContent contest={contest} />
    </>
  );
}

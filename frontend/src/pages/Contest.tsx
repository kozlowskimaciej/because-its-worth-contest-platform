import React from "react";
import Navbar from "../components/common/Navbar";
import ContestPreview from "../components/contest/ContestPreview";
import Entries from "../components/contest/Entries";
import { useParams } from "react-router-dom";
import { prepareSingleContest } from "../utils/prepareContests";
import { prepareEntries } from "../utils/prepareEntries";
import * as api2 from "../fakeApi/entries";
import useFetch from "../hooks/useFetch";

export default function Contest() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useFetch<any>(`${process.env.REACT_APP_SERVER_URL}/entries/${id}`);

  if (isLoading || isLoading2) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>not found</div>;

  const contest = prepareSingleContest(data.data);

  return (
    <>
      <Navbar />
      <>
        <div style={{ height: "100px" }} />
        <ContestPreview contest={contest} />
        {!error2 && data2 && <Entries entries={prepareEntries(data2)} />}
      </>
    </>
  );
}

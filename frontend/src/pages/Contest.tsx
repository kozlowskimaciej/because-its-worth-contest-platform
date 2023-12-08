import React from "react";
import Navbar from "../components/common/Navbar";
import ContestPreview from "../components/contest/ContestPreview";
import Entries from "../components/contest/Entries";
import { useParams } from "react-router-dom";
import { prepareContests } from "../utils/prepareContests";
import * as api from "../fakeApi/contests";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import { prepareEntries } from "../utils/prepareEntries";
import * as api2 from "../fakeApi/entries";

export default function Contest() {
  const { id } = useParams();

  const contests = prepareContests(api.contests);
  const matchingContest = contests.filter((contest) => contest.id === id);

  // fetch based on id
  const entries = prepareEntries(api2.entries);

  return (
    <>
      <Navbar />
      {matchingContest.length > 0 ? (
        <>
          <div style={{ height: "100px" }} />
          <ContestPreview contest={matchingContest[0]} />
          <Entries entries={entries} />
        </>
      ) : (
        <NotFoundInfo />
      )}
    </>
  );
}

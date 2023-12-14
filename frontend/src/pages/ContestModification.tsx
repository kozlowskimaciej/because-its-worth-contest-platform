import React from "react";
import Navbar from "../components/common/Navbar";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import { useParams } from "react-router-dom";
import { prepareContests } from "../utils/prepareContests";
import * as api from "../fakeApi/contests";

export default function ContestModification() {
  const { id } = useParams();

  const contests = prepareContests(api.contests);
  const matchingContests = contests.filter((contest) => contest.id === id);

  if (matchingContests.length === 0) return null;

  const matchingContest = matchingContests[0];

  const contest = {
    title: matchingContest.name,
    description: matchingContest.description,
    deadline: matchingContest.deadline,
    contestCategory: matchingContest.category,
    entryCategories: matchingContest.entryCategories,
    formats: matchingContest.acceptedFileFormats,
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "700px", margin: "auto", paddingTop: "140px" }}>
        <ContestCreationForm initialValues={contest} />
      </div>
    </>
  );
}

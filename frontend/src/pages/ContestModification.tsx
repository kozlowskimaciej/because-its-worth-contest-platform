import React from "react";
import Navbar from "../components/common/Navbar";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import { useParams } from "react-router-dom";
import {
  prepareContests,
  prepareSingleContest,
} from "../utils/prepareContests";
import * as api from "../fakeApi/contests";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import useFetch from "../hooks/useFetch";

export default function ContestModification() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  if (!data)
    return (
      <>
        <Navbar />
        <NotFoundInfo />
      </>
    );

  const matchingContest = prepareSingleContest(data.data);

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

import React from "react";
import Navbar from "../components/common/Navbar";
import ContestPreview from "../components/contest/ContestPreview";
import { useParams } from "react-router-dom";
import { prepareSingleContest } from "../utils/prepareContests";
import useFetch from "../hooks/useFetch";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import RateButton from "../components/contest/RateButton";
import useCheckToken from "../hooks/useCheckToken";

export default function Contest() {
  useCheckToken();
  const { id } = useParams();

  const { data, isLoading, error } = useFetch<any>(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  if (isLoading)
    return (
      <>
        <Navbar />
        <Loading text="" />
      </>
    );

  if (!data || error)
    return (
      <>
        <Navbar />
        <NotFoundInfo text="Podany konkurs nie istnieje." />
      </>
    );

  const contest = prepareSingleContest(data.data);

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "100px" }} />
        <ContestPreview contest={contest} />
        <RateButton />
      </div>
    </>
  );
}

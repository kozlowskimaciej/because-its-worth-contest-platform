import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import { prepareEntries } from "../utils/prepareEntries";
import Navbar from "../components/common/Navbar";
import Entries from "../components/rate/Entries";
import RateContextProvider from "../contexts/RateContext";
import FinishButton from "../components/rate/FinishButton";

export default function Rate() {
  const { id } = useParams();

  const {
    data: contest,
    isLoading: contestIsLoading,
    error,
  } = useFetch(`${process.env.REACT_APP_SERVER_URL}/contests/?id=${id}`);

  const { data, isLoading } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/entries/${id}`,
    {
      withCredentials: true,
    }
  );

  if (isLoading || contestIsLoading)
    return (
      <>
        <Navbar />
        <Loading text="" />
      </>
    );

  if (contest && (contest as any).data.ended === true)
    return (
      <>
        <Navbar />
        <NotFoundInfo text="Konkurs został już zakończony." />
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <NotFoundInfo text="Podany konkurs nie istnieje." />
      </>
    );

  const entries = prepareEntries(data);

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <FinishButton />
      <RateContextProvider entries={entries}>
        <Entries />
      </RateContextProvider>
    </>
  );
}

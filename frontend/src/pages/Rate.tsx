import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import { prepareEntries } from "../utils/prepareEntries";
import Navbar from "../components/common/Navbar";
import Entries from "../components/rate/Entries";
import RateContextProvider from "../contexts/RateContext";

export default function Rate() {
  const { id } = useParams();

  const { data, isLoading } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/entries/${id}`,
    {
      withCredentials: true,
    }
  );

  if (isLoading)
    return (
      <>
        <Navbar />
        <Loading text="" />
      </>
    );

  const entries = prepareEntries(data);

  if (entries.length === 0)
    return (
      <>
        <Navbar />
        <NotFoundInfo text="Podany konkurs nie istnieje lub nie zostały zgłoszone żadne prace." />
      </>
    );

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <RateContextProvider entries={entries}>
        <Entries />
      </RateContextProvider>
    </>
  );
}

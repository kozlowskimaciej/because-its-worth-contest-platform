import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";
import { prepareEntries } from "../utils/prepareEntries";
import Navbar from "../components/common/Navbar";
import Entries from "../components/rate/Entries";

export default function Rate() {
  const { id } = useParams();

  const { data, error, isLoading } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/entries/${id}`
  );

  if (isLoading)
    return (
      <>
        <Navbar />
        <Loading text="" />
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
      <Entries entries={entries} />
    </>
  );
}

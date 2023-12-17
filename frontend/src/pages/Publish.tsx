import React from "react";
import Navbar from "../components/common/Navbar";
import PublishForm from "../components/publish/PublishForm";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/common/Loading";
import NotFoundInfo from "../components/notFound/NotFoundInfo";

export default function Publish() {
  const { id } = useParams();

  const { isLoading, error } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/contests?id=${id}`
  );

  if (isLoading)
    return (
      <>
        <Navbar />
        <Loading text="" />
      </>
    );

  if (error) return <NotFoundInfo text="Podany konkurs nie istnieje." />;
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ paddingTop: "100px", paddingBottom: "60px" }}>
          Załącz pliki tekstowe z adresami email uczestników
        </h2>
        <PublishForm />
      </div>
    </>
  );
}

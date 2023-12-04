import React from "react";
import Navbar from "../components/common/Navbar";
import PublishForm from "../components/publish/PublishForm";

export default function Publish() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ paddingTop: "100px", paddingBottom: "60px" }}>
          załącz pliki tekstowe z mailami uczestników
        </h2>
        <PublishForm />
      </div>
    </>
  );
}

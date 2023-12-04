import React from "react";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import Navbar from "../components/common/Navbar";

export default function ContestCreation() {
  return (
    <>
      <Navbar />
      <div style={{ width: "700px", margin: "auto", paddingTop: "140px" }}>
        <ContestCreationForm />
      </div>
    </>
  );
}

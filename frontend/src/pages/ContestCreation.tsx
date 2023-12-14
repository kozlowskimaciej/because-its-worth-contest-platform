import React from "react";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import Navbar from "../components/common/Navbar";

export default function ContestCreation() {
  const emptyContest = {
    title: "",
    description: "",
    deadline: new Date(),
    contestCategory: "",
    entryCategories: [],
    formats: [],
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "700px", margin: "auto", paddingTop: "140px" }}>
        <ContestCreationForm initialValues={emptyContest} />
      </div>
    </>
  );
}

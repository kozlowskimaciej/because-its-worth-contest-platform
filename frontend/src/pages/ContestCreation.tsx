import React, { useState } from "react";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import Navbar from "../components/common/Navbar";
import ContestCreatedInfo from "../components/contestCreation/ContestCreatedInfo";
import ContestCreationFormContextProvider from "../contexts/ContestCreationFormContext";

export default function ContestCreation() {
  const [createdContestID, setCreatedContestID] = useState<string | null>(null);

  const emptyContest = {
    title: "",
    description: "",
    deadline: new Date(),
    contestCategory: "",
    entryCategories: [],
    formats: [],
  };

  if (createdContestID) {
    return <ContestCreatedInfo id={createdContestID} />;
  }

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ maxWidth: "800px", paddingTop: "140px" }}
      >
        <ContestCreationFormContextProvider initialValues={emptyContest}>
          <ContestCreationForm setCreatedContestID={setCreatedContestID} />
        </ContestCreationFormContextProvider>
      </div>
    </>
  );
}

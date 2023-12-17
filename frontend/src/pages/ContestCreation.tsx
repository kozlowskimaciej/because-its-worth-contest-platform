import React, { useState } from "react";
import ContestCreationForm from "../components/contestCreation/ContestCreationForm";
import Navbar from "../components/common/Navbar";
import ContestCreatedInfo from "../components/contestCreation/ContestCreatedInfo";

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
      <div style={{ width: "700px", margin: "auto", paddingTop: "140px" }}>
        <ContestCreationForm
          initialValues={emptyContest}
          setCreatedContestID={setCreatedContestID}
        />
      </div>
    </>
  );
}

import React from "react";
import Navbar from "../components/common/Navbar";
import ContestPreview from "../components/contest/ContestPreview";
import Entries from "../components/contest/Entries";

export default function Contest() {
  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <ContestPreview />
      <Entries />
    </>
  );
}

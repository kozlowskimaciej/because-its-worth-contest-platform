import React from "react";
import Navbar from "../components/common/Navbar";
import ContestPreview from "../components/contest/ContestPreview";

export default function Contest() {
  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <ContestPreview />
    </>
  );
}

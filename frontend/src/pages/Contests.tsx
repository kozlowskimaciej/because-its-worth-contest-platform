import React from "react";
import Navbar from "../components/common/Navbar";
import ContestsInner from "../components/Contests/Contests";

export default function Contests() {
  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <ContestsInner />
    </>
  );
}

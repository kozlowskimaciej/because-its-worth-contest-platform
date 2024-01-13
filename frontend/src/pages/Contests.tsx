import React from "react";
import Navbar from "../components/common/Navbar";
import ContestsInner from "../components/Contests/Contests";
import useCheckToken from "../hooks/useCheckToken";

export default function Contests() {
  useCheckToken();

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }} />
      <ContestsInner />
    </>
  );
}

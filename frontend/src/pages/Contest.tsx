import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function Contest() {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>Contest {id}</div>
    </div>
  );
}

import React from "react";
import Navbar from "../components/common/Navbar";
import Cards from "../components/home/Cards";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h2 style={{ paddingTop: "170px", textAlign: "center" }}>
        Platforma konkursowa fundacji "Bo warto"
      </h2>
      <Cards />
    </div>
  );
}

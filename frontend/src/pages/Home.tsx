import React from "react";
import Navbar from "../components/common/Navbar";
import Cards from "../components/home/Cards";
import useCheckToken from "../hooks/useCheckToken";

export default function Home() {
  useCheckToken();

  return (
    <div>
      <Navbar />
      <Cards />
    </div>
  );
}

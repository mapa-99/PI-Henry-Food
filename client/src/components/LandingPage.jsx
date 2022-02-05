import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <h1>Proyecto Individual Food (Mejorar titulo :/)</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </>
  );
};

export default LandingPage;

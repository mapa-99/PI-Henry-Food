import React from "react";
import { Link } from "react-router-dom";
import "./styles/styles.css"

const LandingPage = () => {
  return (
    <div >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          color: "#b80000",
          verticalAlign: "middle",
        }}
      >
      🥙 La guía de Recetas que necesitas 🥙
      </h1>
      <Link to="/home">
        <button className="create-button">Ingresar</button>
      </Link>
    </div>
  );
};

export default LandingPage;

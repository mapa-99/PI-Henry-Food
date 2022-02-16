import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import "./styles/cardStyles.css";
const GridCards = ({ recipes }) => {
  return (
    <div className="cards-containter">
      {recipes?.map((rec) => (
        <Link
          key={rec.id}
          to={`/home/${rec.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Card
            key={rec.id}
            diet={rec.dietType}
            name={rec.name}
            image={rec.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default GridCards;

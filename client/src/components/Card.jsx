import React from "react";
import "./styles/cardStyles.css";
const Card = ({ image, name, diet }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img
        src={
          image
            ? image
            : "https://th.bing.com/th/id/R.421804faf23fcb4aa4fbc3c49dde34b2?rik=VyqDrXD3vw4vKg&pid=ImgRaw&r=0"
        }
        alt="not found"
        className="recipe-image"
      />
      <p style={{ fontSize: "18px" }}>
        <b>diets:</b>
      </p>
      <ul>
        {diet?.map((d) => (
          <li key={d.id} style={{ textAlign: "initial" }}>
            <b>{d}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;

import React from "react";

const Card = ({ image, name, diet }) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="image not found" width="200px" height="250px" />
      <h3>{diet}</h3>
    </div>
  );
};

export default Card;

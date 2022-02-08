import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../redux/actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
    console.log(name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getNameRecipe(name));
  };
  return (
    <div>
      <h1>Mi super Search bar!</h1>
      <input
        type="text"
        placeholder="Buscar receta por el nombre"
        onChange={(event) => handleInputChange(event)}
      />
      <button type="submit" onSubmit={(event) => handleSubmit(event)}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;

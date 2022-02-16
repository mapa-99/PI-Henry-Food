import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameRecipes } from "../redux/actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(getNameRecipes(name));
      setName("");
    }
  };
  return (
    <div style={{ margin: "1.2rem" }}>
      <input
        type="text"
        placeholder="Buscar receta.."
        size="50"
        style={{ fontSize: "15px" }}
        onChange={(event) => handleInputChange(event)}
      />
      <button
        style={{ width:"50px"}}
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
         🔍
      </button>
    </div>
  );
};

export default SearchBar;

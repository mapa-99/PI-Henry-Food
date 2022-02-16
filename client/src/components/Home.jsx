import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRecipesByDiet,
  getRecipes,
  orderByName,
  orderByPuntuation,
  getDiets,
} from "../redux/actions";
import { Link } from "react-router-dom";
// import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
// import { plate } from "../data";
import GridCards from "./GridCards";
import FiltrationBar from "./FiltrationBar";
import "./styles/styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage + recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
  const diets = useSelector((state) => state.diets);

  // console.log("diets value...", diets);
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, []);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getRecipes());
  };

  //TODO: CORREGIR ESTA FUNCIÓN...
  const handleFilterDiet = (e) => {
    dispatch(filterRecipesByDiet(e.target.value));
  };
  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  const handleSortPuntuation = (e) => {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  return (
    <div>
      {/* {allRecipes.length > 0 ? ( */}
      <>
        <h1 style={{ fontSize: "50px", color: "#e09200" }}>
          Las mejores recetas!
        </h1>
        <Link to="/recipe">
          <button className="create-button">Quiero crear una receta</button>
        </Link>
        <button onClick={handleClick} className="repeat-button">
          🔁 Cargar todas las Recetas
        </button>
        <br />
        {/* <SearchBar /> */}
        <FiltrationBar
          handleSort={(e) => handleSort(e)}
          handleSortPuntuation={(e) => handleSortPuntuation(e)}
          diets={diets}
          handleFilterDiet={(e) => handleFilterDiet(e)}
        />
        <Pagination
          allRecipes={allRecipes.length}
          paginado={paginado}
          recipesPerPage={recipesPerPage}
        />

        <GridCards recipes={currentRecipes} />
      </>
      {/* ) : (
         <iframe
      //     src="https://giphy.com/embed/3o7bu8sRnYpTOG1p8k" */}
      {/* width="480"
           height="480"
           frameBorder="0"
           class="giphy-embed"
         />
       )} */}
    </div>
  );
};

export default Home;

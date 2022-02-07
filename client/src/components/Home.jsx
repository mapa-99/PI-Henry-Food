import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipesByDiet, getRecipes, orderByName } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexLastRecipe = currentPage + recipesPerPage;
  const indexFirstRecipe = indexLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

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
  return (
    <div>
      <Link to="/recipe">Crear receta bien mela</Link>
      <h1>Recetas melisisisisisisisisisimas</h1>
      <button onClick={handleClick}>Cargar las Recetas...</button>
      {/* TODO:
        - Botones/Opciones para filtrar por por tipo de dieta
        - Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
        - Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina. */}
      <div>
        {/*Por nombre */}
        <p>Ordenar por...</p>
        <p>Nombre Ascendente/Descendente</p>

        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascendente (nombre)</option>
          <option value="desc">Descendente (nombre)</option>
        </select>
        {/* Por puntuación */}
        <p>Puntuación</p>
        
        <select>
          <option value="numAsc">Ascendente</option>
          <option value="numDesc">Descendente</option>
        </select>
        <p>Filtrar por Dieta</p>

        <select
          onChange={(e) => handleFilterDiet(e)}
          style={{ backgroundColor: "red" }}
        >
          <option value="all">Todas</option>
          <option value="gluten free">Gluten free</option>
          <option value="vegetarian">Vegetarian</option>
          {/* <option value=""></option>
          <option value=""></option> */}
        </select>
      </div>
      <Pagination
        allRecipes={allRecipes.length}
        paginado={paginado}
        recipesPerPage={recipesPerPage}
      />
      {currentRecipes &&
        currentRecipes.map((rec) => {
          return (
            <div>
              <Link to={"/home/" + rec.id}>
                <Card
                  name={rec.name}
                  image={rec.image}
                  diet={rec.dietType}
                  key={rec.id}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Home;

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getRecipes());
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
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        {/* Por puntuación */}
        <select>
          <option value="numAsc">Ascendente</option>
          <option value="numDesc">Descendente</option>
        </select>
        <select>
          <option value="all">Todas</option>
          <option value="gluten free">Gluten free</option>
          <option value="vegetarian">Vegetarian</option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
      {allRecipes &&
        allRecipes.map((rec) => {
          return (
            <div>
              <Link to={"/home" + rec.id}>
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

import React from "react";
// import SearchBar from "./SearchBar";
import "./styles/styles.css";

const FiltrationBar = ({
  handleSort,
  handleSortPuntuation,
  handleFilterDiet,
  diets,
}) => {
  return (
    <div className="filtration">
      <b>Ordenar/filtrar por: </b>
      <div style={{ display: "inline-flex" }}>
        <div>
          <p>Nombre</p>

          <select onChange={handleSort}>
            <option value="asc">Ascendente </option>
            <option value="desc">Descendente </option>
          </select>
        </div>
        <div style={{ padding: "0px 40px" }}>
          <p>Puntuación</p>

          <select onChange={handleSortPuntuation}>
            <option value="numAsc">Ascendente</option>
            <option value="numDesc">Descendente</option>
          </select>
        </div>
        <div>
          <p>Por Dieta</p>

          <select onChange={handleFilterDiet}>
            <option value="all">Todas</option>
            {diets.map((diet) => (
              <option value={diet.name} key={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrationBar;

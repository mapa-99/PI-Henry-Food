import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
const RecipeForm = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState({
    name: "",
    summary: "",
    puntuation: 0,
    dietType: [],
    image: "",
    stepByStep: "",
  });
  useEffect(() => {
    dispatch(getDiets());
  }, []);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu receta super deliciosa</h1>
      <form>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Puntuación: </label>
          <input
            type="number"
            value={input.puntuation}
            name="puntuation"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>url de la Imagen de la receta: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Resumen: </label>
          <textarea
            value={input.summary}
            name="summary"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Paso a paso: </label>
          <textarea
            value={input.stepByStep}
            name="stepByStep"
            onChange={handleChange}
          />
        </div>
        <select>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}</option>
          ))}
        </select>
        <button type="submit"> Crear receta!</button>
      </form>
    </div>
  );
};

export default RecipeForm;

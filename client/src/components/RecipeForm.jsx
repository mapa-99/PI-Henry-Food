import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./styles/styles.css"

const validation = (input) => {
  let errors = {};
  if (!input.name) errors.name = "El nombre es obligatorio!";
  else if (!input.summary)
    errors.summary = "El resumen de la receta es obligatoria!";
  return errors;
};
const RecipeForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const diets = useSelector((state) => state.diets);

  const [errors, setErrors] = useState({});
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
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    console.log(input);
  };
  // const handleCheck = (event) => {
  //   event.target.checked &&
  //     setInput({
  //       ...input,
  //       dietType: [...input.dietType, event.target.value],
  //     });
  // };
  const handleSelect = (event) => {
    setInput({
      ...input,
      dietType: [...input.dietType, event.target.value],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    dispatch(postRecipe(input));
    alert("Receta Creada exitosamente!");
    setInput({
      name: "",
      summary: "",
      puntuation: 0,
      dietType: [],
      image: "",
      stepByStep: "",
    });
    history("/home");
  };
  const handleDelete = (element) => {
    setInput({
      ...input,
      dietType: input.dietType.filter((diet) => diet !== element),
    });
  };
  return (
    <div
     className="form-container"
    >
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu receta super deliciosa</h1>
      <form>
        <div>
          <label>
            <p>
              <b>Nombre de la receta:</b>
            </p>
          </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            size="50"
          />
          {errors.name && (
            <p>
              <b>{errors.name}</b>
            </p>
          )}
        </div>
        <div style={{ display: "inline-flex" }}>
          <div>
            <label>
              <p>
                <b>Puntuación</b>
              </p>
            </label>
            <input
              type="number"
              value={input.puntuation}
              name="puntuation"
              
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              <p>
                <b>url de la Imagen de la receta:</b>
              </p>{" "}
            </label>
            <input
              type="text"
              value={input.image}
              name="image"
            

              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>
            <p>
              <b>Resumen:</b>
            </p>{" "}
          </label>
          <textarea
            value={input.summary}
            rows="5"
            cols="50"
            name="summary"
            onChange={handleChange}
          />
          {errors.summary && (
            <p>
              <b>{errors.summary}</b>
            </p>
          )}
        </div>
        <div>
          <label>
            <p>
              <b>Paso a paso:</b>
            </p>{" "}
          </label>
          <textarea
            value={input.stepByStep}
            rows="5"
            cols="50"
            name="stepByStep"
            onChange={handleChange}
          />
        </div>
        <br />
        {/* <div>
          {diets.map((diet) => (
            <label key={diet.id}>
              <input
                type="checkbox"
                name={diet.name}
                value={diet.name}
                onChange={(e) => handleChange(e)}
              />
              {diet.name}
            </label>
          ))}
        </div> */}
        <label>
          <p>
            <b>Tipo de dieta a la que pertenece:</b>
          </p>
        </label>
        <select onChange={(event) => handleSelect(event)}>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}</option>
          ))}
        </select>

        <p>
          {input.dietType.map((element) => (
            <>
              <b>{element}</b>
              <button onClick={handleDelete}>✖</button>
            </>
          ))}
        </p>

        <button  className="create-button" type="submit" onClick={(event) => handleSubmit(event)}>
          Crear receta!
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;

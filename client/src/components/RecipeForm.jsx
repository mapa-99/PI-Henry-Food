import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDiets, postRecipe } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./styles/styles.css";

const validation = (input) => {
  let errors = {};
  if (!input.name) errors.name = "El nombre es obligatorio!";
  else if (!input.summary) errors.summary = "La receta debe tener un resumen!";

  return errors;
};
const RecipeForm = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const diets = useSelector((state) => state.diets);
  const [validate, setValidate] = useState(null);
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
    if (input.name && input.summary) {
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
    } else {
      setValidate(false);
    }
  };
  const handleDelete = (element) => {
    setInput({
      ...input,
      dietType: input.dietType.filter((diet) => diet !== element),
    });
  };
  return (
    <div className="form-container">
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu receta super deliciosa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <p>
              <b>Nombre de la receta: *</b>
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
                <b>url de la Imagen de la receta: 📷 </b>
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
              <b>Resumen: *</b>
            </p>{" "}
          </label>
          <textarea
            value={input.summary}
            rows="5"
            cols="50"
            name="summary"
            onChange={handleChange}
          />
        </div>
        {errors.summary && (
          <p>
            <b>{errors.summary}</b>
          </p>
        )}
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
              <button onClick={(event) => handleDelete(event)}>✖</button>
            </>
          ))}
        </p>

        <button className="create-button" type="submit">
          Crear receta!
        </button>
        {validate === false && (
          <div className="alert-container">
            <h2>🚧 Debes completar los datos obligatorios 🚧</h2>
          </div>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;

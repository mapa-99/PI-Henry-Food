import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetail } from "../redux/actions";
import "./styles/styles.css";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch]);
  const myRecipe = useSelector((state) => state.detail);
  console.log("My recipe...", myRecipe);
  return (
    <div>
      {myRecipe.length > 0 ? (
        <div className="details">
          <Link to="/home">
            <button>Volver</button>
          </Link>
          <h1>{myRecipe[0].name}</h1>
          <img
            src={
              myRecipe[0].img
                ? "https://th.bing.com/th/id/R.421804faf23fcb4aa4fbc3c49dde34b2?rik=VyqDrXD3vw4vKg&pid=ImgRaw&r=0"
                : myRecipe[0].image
            }
            width="450px"
          />
          <p>
            <b>Dietas:</b>
          </p>
          <ul>
            {myRecipe[0].dietType?.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
          <p>
            <b>Resumen: </b>
          </p>
          <p>{myRecipe[0].summary}</p>
          <p>
            <b>Paso a paso</b>
          </p>
          <span>{myRecipe[0].stepByStep}</span>
          <div style={{ display: "inline-flex" }}>
            <div style={{ padding: "20px" }}>
              <p>
                <b>Puntuación</b>
              </p>
              <h2>{myRecipe[0].puntuation}</h2>
            </div>
            <div style={{ padding: "20px" }}>
              <p>
                <b>Nivel de comida saludable: </b>
              </p>
              <h2>{myRecipe[0].healthyFoodLevel}</h2>
            </div>
          </div>
        </div>
      ) : (
        <iframe src="https://tenor.com/view/eat-it-gif-20209490" />
      )}
    </div>
  );
};

export default Details;

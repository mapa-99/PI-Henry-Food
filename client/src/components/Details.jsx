import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeDetail } from "../redux/actions";

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
        <div>
          <h1>{myRecipe[0].name}</h1>
          <img src={myRecipe[0].img ? myRecipe[0].img : myRecipe[0].image} />
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
          <p>{myRecipe[0].stepByStep}</p>
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
        <img src="https://tenor.com/view/eat-it-gif-20209490" />
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default Details;

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
  return <div>Details</div>;
};

export default Details;

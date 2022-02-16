import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes", {});
      return dispatch({
        type: "GET_RECIPES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      var info = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDiets() {
  return async function (dispatch) {
    try {
      var info = await axios.get("http://localhost:3001/types", {});
      return dispatch({
        type: "GET_DIETS",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/recipe ", payload);
    console.log(res);
    return res;
  };
}

export function filterRecipesByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPuntuation(payload) {
  return {
    type: "ORDER_BY_PUNTUATION",
    payload,
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      var info = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: "GET_RECIPE_DETAIL",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

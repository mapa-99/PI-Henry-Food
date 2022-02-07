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

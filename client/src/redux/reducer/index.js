const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};
function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "FILTER_BY_DIET":
      const allRecipes = state.allRecipes;
      const dietFilter =
        payload === "all"
          ? allRecipes
          : allRecipes.filter((rec) => rec.dietType.includes(payload));
      return {
        ...state,
        recipes: dietFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case "ORDER_BY_PUNTUATION":
      let sorted =
        payload === "numAsc"
          ? state.recipes.sort((a, b) => {
              return a.puntuation - b.puntuation;
            })
          : state.recipes.sort((a, b) => {
              return b.puntuation - a.puntuation;
            });
      return {
        ...state,
        recipes: sorted,
      };
    case "GET_NAME_RECIPES":
      console.log("El payload del reducer", payload);
      return {
        ...state,
        recipes: payload,
      };

    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        detail: payload,
      };
    default:
      return state;
  }
}
export default rootReducer;

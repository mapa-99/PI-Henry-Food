const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
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
          : allRecipes.filter((rec) => rec.diets.includes(payload));
      return {
        ...state,
        recipes: dietFilter,
      };

    case "ORDER_BY_NAME":
      let sortedArr = [];
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
      let sorted = [];
      payload === "asc"
        ? state.recipes.sort((a, b) => {
            if (a.spoonacularScore > b.spoonacularScore) return 1;
            if (b.spoonacularScore > a.spoonacularScore) return -1;
            return 0;
          })
        : state.recipes.sort((a, b) => {
            if (a.spoonacularScore > b.spoonacularScore) return -1;
            if (b.spoonacularScore > a.spoonacularScore) return 1;
            return 0;
          });
      return {
        ...state,
        recipes: sorted,
      };
    case "GET_NAME_RECIPE":
      return {
        ...state,
        recipes: payload,
      };
    default:
      return state;
  }
}
export default rootReducer;

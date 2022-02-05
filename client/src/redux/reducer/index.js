const initialState = {
  recipes: [],
};
function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: payload,
      };
    default:
      return state;
  }
}
export default rootReducer;

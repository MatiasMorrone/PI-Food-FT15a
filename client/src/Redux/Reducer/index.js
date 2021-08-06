const initialState = {
  recipes: [],
  recipeById: {},
  diets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_RECIPES_ID":
      return {
        ...state,
        recipeById: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return state;
  }
};

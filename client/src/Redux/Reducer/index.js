const initialState = {
  recipes: [],
  recipeById: {},
  diets: [],
  orderedRecipes: [],
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
    case "ORDER_AZ":
      if (state.orderedRecipes.length > 0) {
        var orderedAZ = state.orderedRecipes.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: orderedAZ };
      } else {
        let ordered = state.recipes.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: ordered };
      }
    case "ORDER_ZA":
      if (state.orderedRecipes.length > 0) {
        var orderedZA = state.orderedRecipes.sort(function (a, b) {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: orderedZA };
      } else {
        let ordered = state.recipes.sort(function (a, b) {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: ordered };
      }

    case "ORDER_SCORE":
      if (state.orderedRecipes.length > 0) {
        var orderedScore = state.orderedRecipes.sort(function (a, b) {
          if (a.spoonacularScore < b.spoonacularScore) {
            return 1;
          }
          if (a.spoonacularScore > b.spoonacularScore) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: orderedScore };
      } else {
        let ordered = state.recipes.sort(function (a, b) {
          if (a.spoonacularScore < b.spoonacularScore) {
            return 1;
          }
          if (a.spoonacularScore > b.spoonacularScore) {
            return -1;
          }
          return 0;
        });
        return { ...state, orderedRecipes: ordered };
      }
    case "GET_DIETS_RECIPES":
      if (state.orderedRecipes.length > 0) {
        var dietRecipes = state.orderedRecipes.filter((recipe) => {
          return recipe.diets.includes(action.payload);
        });
      } else {
        var dietRecipes = state.recipes.filter((recipe) => {
          return recipe.diets.includes(action.payload);
        });
      }
      return { ...state, orderedRecipes: dietRecipes };
    default:
      return state;
  }
};

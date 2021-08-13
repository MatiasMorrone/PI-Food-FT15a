const initialState = {
  recipes: [],
  recipeById: {},
  diets: [],
  orderedRecipes: [],
  flag: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES_NAME":
      if (state.flag) {
        return {
          ...state,
          flag: false,
          recipes: action.payload,
        };
      }

      return {
        ...state,
        orderedRecipes: action.payload,
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
        let OrderAZ = orderedAZ.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrderAZ };
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
        let OrderAZ = ordered.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrderAZ };
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
        let OrdenZA = orderedZA.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrdenZA };
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
        let OrdenZA = ordered.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrdenZA };
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
        let OrdenScore = orderedScore.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrdenScore };
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
        let OrdenScore = ordered.map((recipe) => recipe);
        return { ...state, orderedRecipes: OrdenScore };
      }
    case "GET_DIETS_RECIPES":
      if (state.orderedRecipes.length > 0) {
        let dietRecipes = state.orderedRecipes.filter((recipe) => {
          if (recipe.diets.includes(action.payload)) {
            return recipe;
          }
        });
        return { ...state, orderedRecipes: dietRecipes };
      } else {
        let dietRecipes = state.recipes.filter((recipe) => {
          if (recipe.diets.includes(action.payload)) {
            return recipe;
          }
        });
        return { ...state, orderedRecipes: dietRecipes };
      }
    default:
      return state;
  }
};

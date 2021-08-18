const initialState = {
  recipes: [],
  recipeById: {},
  diets: [],
  orderedRecipes: [],
  flag: "All",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_RECIPES_NAME":
      return {
        ...state,
        orderedRecipes: action.payload,
        recipes: action.payload,
        flag: "One",
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

    case "ORDER_ZA":
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

    case "ORDER_SCORE_UP":
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

    case "ORDER_SCORE_DOWN":
      var orderedScore = state.orderedRecipes.sort(function (a, b) {
        if (a.spoonacularScore > b.spoonacularScore) {
          return 1;
        }
        if (a.spoonacularScore < b.spoonacularScore) {
          return -1;
        }
        return 0;
      });
      var OrdenScoreDown = orderedScore.map((recipe) => recipe);
      return { ...state, orderedRecipes: OrdenScoreDown };

    case "ORDER_HEALTH_DOWN":
      var orderedScore = state.orderedRecipes.sort(function (a, b) {
        if (a.healthScore > b.healthScore) {
          return 1;
        }
        if (a.healthScore < b.healthScore) {
          return -1;
        }
        return 0;
      });
      var OrdenScoreDown = orderedScore.map((recipe) => recipe);
      return { ...state, orderedRecipes: OrdenScoreDown };

    case "ORDER_HEALTH_UP":
      var orderedScore = state.orderedRecipes.sort(function (a, b) {
        if (a.healthScore < b.healthScore) {
          return 1;
        }
        if (a.healthScore > b.healthScore) {
          return -1;
        }
        return 0;
      });
      var OrdenScoreDown = orderedScore.map((recipe) => recipe);
      return { ...state, orderedRecipes: OrdenScoreDown };

    case "GET_DIETS_RECIPES":
      let dietRecipes = state.recipes.filter((recipe) => {
        if (recipe.diets.includes(action.payload)) {
          return recipe;
        }
      });

      return { ...state, orderedRecipes: dietRecipes, flag: "One" };

    default:
      return state;
  }
};

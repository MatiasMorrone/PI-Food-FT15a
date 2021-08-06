const axios = require("axios");

export async function getRecipebynamequery(name) {
  return function (dispatch) {
    let recipesbyquery = await axios.get(
      `http://localhost3001/recipes?name=${name}`
    );
    dispatch({ type: "GET_RECIPES_NAME", payload: recipesbyquery });
  };
}

export async function getRecipeByID(id) {
  return function (dispatch) {
    let recipesbyid = await axios.get(`http://localhost3001/recipes/${id}`);
    dispatch({ type: "GET_RECIPES_ID", payload: recipesbyid });
  };
}

export async function getDiets() {
  return function (dispatch) {
    let diets = await axios.get("http://localhost3001/types");
    dispatch({ type: "GET_DIETS", payload: diets });
  };
}

// para ver todavia quizas sirva hacerlo en el form directamente

// export async function postRecipe(recipeObject) {
//   return function (dispatch) {
//     let post = await axios.post("http:localhost3001/recipes", recipeObject);
//     dispatch({ type: "POST_RECIPE", payload: recipeObject });
//   };
// }

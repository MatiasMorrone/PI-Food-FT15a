const axios = require("axios");

export function getRecipeByNameQuery(name) {
  return function (dispatch) {
    if (!name) {
      name = "";
    }
    return axios
      .get(`http://localhost:3001/recipes?name=${name}`)
      .then((data) => dispatch({ type: "GET_RECIPES_NAME", payload: data }));
  };
}

export function getRecipeByID(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((data) => dispatch({ type: "GET_RECIPES_ID", payload: data }));
  };
}

export function getDiets() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/types")
      .then((data) => dispatch({ type: "GET_DIETS", payload: data }));
  };
}

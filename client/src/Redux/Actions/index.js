const axios = require("axios");
export function getRecipeByNameQuery(name) {
  return function (dispatch) {
    if (!name) {
      name = "";
    }
    return axios
      .get(`http://localhost:3001/recipes?name=${name}`)
      .then((data) => dispatch({ type: "GET_RECIPES_NAME", payload: data }))
      .catch((err) => console.log(err));
  };
}

export function getRecipeByID(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((data) => dispatch({ type: "GET_RECIPES_ID", payload: data }))
      .catch((err) => console.log(err));
  };
}

export function getDiets() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/types")
      .then((data) => dispatch({ type: "GET_DIETS", payload: data }))
      .catch((err) => console.log(err));
  };
}

export function orderAZ() {
  return function (dispatch) {
    return dispatch({ type: "ORDER_AZ" });
  };
}

export function orderZA() {
  return function (dispatch) {
    return dispatch({ type: "ORDER_ZA" });
  };
}

export function orderScore() {
  return function (dispatch) {
    return dispatch({ type: "ORDER_SCORE" });
  };
}
export function getDietsRecipes(data) {
  return function (dispatch) {
    return dispatch({ type: "GET_DIETS_RECIPES", payload: data });
  };
}

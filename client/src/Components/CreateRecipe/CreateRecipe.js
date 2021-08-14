import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const axios = require("axios");

const CreateRecipe = () => {
  const types = useSelector((state) => state.diets);
  const initialState = {
    title: "",
    summary: "",
    diets: [],
    errors: {},
    spoonacularScore: 0,
    healtScore: 0,
  };
  const [recipe, setRecipe] = useState(initialState);

  function validate(values) {
    let errors = {};
    if (!values.title) {
      errors.title = "You must enter a valid title for your recipe";
    }
    if (!values.summary) {
      errors.summary = "You must enter a valid summary for your recipe";
    }
    if (
      parseInt(values.spoonacularScore) < 0 ||
      parseInt(values.spoonacularScore) > 100
    ) {
      errors.spoonacularScore =
        "The spoonacular Score must be a number between 0 and 100";
    }
    if (parseInt(values.healtScore) < 0 || parseInt(values.healtScore) > 100) {
      errors.healtScore = "The health score must be a number between 0 and 100";
    }
    return errors;
  }
  const handleChange = (e) => {
    setRecipe((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  function addDiet(type) {
    setRecipe({
      ...recipe,
      diets: [...recipe.diets, type],
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, ...sinErrors } = recipe;
    const result = validate(sinErrors);

    setRecipe((prevState) => {
      return {
        ...prevState,
        errors: result,
      };
    });

    if (!Object.keys(result).length) {
      alert("Valid Form");
    }
    // await axios.post("http://localhost:3001/api/characters/", recipe);
    // setRecipe(initialState);
    // document.getElementById("formCreate").reset();
    // alert("se agrego el personaje");
  };

  return (
    <div className="form container">
      <form id="formCreate" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>title</label>
          <input
            name="title"
            className=""
            type="text"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {recipe.errors.title && (
            <p>You must enter a valid title for your recipe</p>
          )}
        </div>
        <div>
          <label>Summary</label>
          <input
            name="summary"
            className=""
            type="text"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {recipe.errors.summary && (
            <p>You must enter a valid summary for your recipe</p>
          )}
        </div>
        <div>
          {types.length &&
            types.map((type, idx) => {
              return (
                <div key={idx}>
                  <p>{type.name}</p>
                  <button
                    onClick={() => {
                      addDiet(type.name);
                    }}
                  >
                    Add
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <p>Spoonacular Score</p>
          <input
            name="spoonacularScore"
            className=""
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {recipe.errors.spoonacularScore && (
            <p>The spoonacular Score must be a number between 0 and 100</p>
          )}
        </div>
        <div>
          <p>Health Score</p>
          <input
            name="healthScore"
            className=""
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {recipe.errors.spoonacularScore && (
            <p>The health score must be a number between 0 and 100</p>
          )}
        </div>
        <div>
          <p>Analized Instructions</p>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRecipe;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const axios = require("axios");

const CreateRecipe = () => {
  const types = useSelector((state) => state.diets);
  const initialState = {
    title: "",
    summary: "",
    diets: [],
    errors: {},
    spoonacularScore: 0,
    healthScore: 0,
    analyzedInstructions: [],
    dishTypes: [],
  };

  const [step, setStep] = useState("");
  const [dishType, setDishType] = useState("");
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
    if (
      parseInt(values.healthScore) < 0 ||
      parseInt(values.healthScore) > 100
    ) {
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

  function addDishType(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      dishTypes: [...recipe.dishTypes, dishType],
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, ...sinErrors } = recipe;
    const result = validate(sinErrors);

    setRecipe((prevState) => {
      return {
        ...prevState,
        healthScore: parseInt(recipe.healthScore),
        spoonacularScore: parseInt(recipe.spoonacularScore),
        errors: result,
      };
    });

    if (!Object.keys(result).length) {
      alert("Valid Form");
    }
    await axios.post("http://localhost:3001/recipes", recipe);
    setRecipe(initialState);
    document.getElementById("formCreate").reset();
    alert("Recipe Uploaded");
  };

  function handleChangeStep(e) {
    setStep(e.target.value);
  }

  function handleChangeDish(e) {
    setDishType(e.target.value);
  }
  function addStep(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      analyzedInstructions: [...recipe.analyzedInstructions, step],
    });
  }

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
                  <p
                    onClick={() => {
                      addDiet(type.name);
                    }}
                  >
                    Add
                  </p>
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
          <p>Dish type</p>
          <input
            name="dishTypes"
            autoComplete="off"
            type="text"
            onChange={(e) => handleChangeDish(e)}
          />
          <button onClick={(e) => addDishType(e)}>Add Dish Type</button>
        </div>
        <div>
          <p>Analized Instruction</p>
          <input
            id="stepinput"
            onChange={(e) => handleChangeStep(e)}
            name="AnalizedInstructions"
            type="text"
            autoComplete="off"
          />
          <button onClick={(e) => addStep(e)}>Add Step</button>
        </div>
        <button type="submit">Create</button>
      </form>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default CreateRecipe;

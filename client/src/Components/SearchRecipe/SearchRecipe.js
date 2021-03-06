import "./SearchRecipe.css";
import { useDispatch } from "react-redux";
import { getRecipeByNameQuery } from "../../Redux/Actions";
import { useState } from "react";

export default function SearchRecipe() {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState("");
  function onChangeRecipe(e) {
    setRecipe(e.target.value);
  }
  function onClick() {
    dispatch(getRecipeByNameQuery(recipe));
    document.getElementsByClassName("inputhome")[0].value = "";
  }

  return (
    <div className="searchrecipe">
      <input
        onChange={(e) => onChangeRecipe(e)}
        className="inputhome"
        placeholder="Search recipe"
        type="text"
        id="Name"
        name="Name"
        autoComplete="off"
      />
      <button className="buttonsearch" onClick={onClick}>
        Search
      </button>
    </div>
  );
}

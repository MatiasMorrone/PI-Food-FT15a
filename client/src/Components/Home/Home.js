import "./Home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeByNameQuery, getDiets } from "../../Redux/Actions";
import Recipes from "../Recipes/Recipes.js";
import SelectDiets from "../SelectDiets/SelectDiets";
import SelectOrder from "../SelectOrder/SelectOrder";
import SearchRecipe from "../SearchRecipe/SearchRecipe";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.recipes);
  const recipesById = useSelector((store) => store.recipesById);
  const diets = useSelector((store) => store.diets);

  useEffect(() => {
    dispatch(getRecipeByNameQuery());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="solofoto">
      <div className="divHome">
        <nav className="navdeHome">
          <SelectDiets />
          <div>
            <SelectOrder />
          </div>
          <div>
            <SearchRecipe />
          </div>
          <div>
            <button className="buttoncreaterecipe">Create Recipe</button>
          </div>
        </nav>
        <h1 className="titulohome">Cheff Master</h1>
      </div>
      <div>
        <Recipes />
      </div>
    </div>
  );
}

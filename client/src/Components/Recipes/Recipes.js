import Recipe from "../Recipe/Recipe";
import "./Recipes.css";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes);
  const orderedRecipes = useSelector((state) => state.orderedRecipes);

  console.log(recipes);
  return (
    <div className="Contener">
      {orderedRecipes.length
        ? orderedRecipes.data.map((recipe, idx) => {
            return (
              <div>
                <Link to="#">
                  <Recipe
                    key={idx}
                    title={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets}
                    summary={recipe.summary}
                  />
                </Link>
              </div>
            );
          })
        : recipes.data &&
          recipes.data.map((recipe, idx) => {
            return (
              <div>
                <Link to="#">
                  <Recipe
                    key={idx}
                    title={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets}
                    summary={recipe.summary}
                  />
                </Link>
              </div>
            );
          })}
    </div>
  );
};
export default Recipes;

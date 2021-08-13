import Recipe from "../Recipe/Recipe";
import "./Recipes.css";

import { Link } from "react-router-dom";

const Recipes = ({ recipes, loading }) => {
  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div>
      <div className="Contener">
        {recipes.length ? (
          recipes.map((recipe, idx) => {
            return (
              <Link to={`/details/${recipe.id}`} className="recipe">
                <Recipe
                  key={idx}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  diets={recipe.diets}
                  summary={recipe.summary}
                  spoonacularScore={recipe.spoonacularScore}
                />
              </Link>
            );
          })
        ) : (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;

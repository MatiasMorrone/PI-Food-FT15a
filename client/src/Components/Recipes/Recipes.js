import Recipe from "../Recipe/Recipe";
import "./Recipes.css";

import { Link } from "react-router-dom";

const Recipes = ({ recipes, loading }) => {
  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="recipes__container">
      {recipes.length ? (
        recipes.map((recipe, idx) => {
          return (
            <div key={idx}>
              <Link to={`/details/${recipe.id}`} className="recipe">
                <Recipe
                  key={idx}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  diets={recipe.diets}
                  summary={recipe.summary}
                  spoonacularScore={recipe.spoonacularScore}
                />
              </Link>
            </div>
          );
        })
      ) : (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;

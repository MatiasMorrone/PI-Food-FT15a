import Recipe from "../Recipe/Recipe";
import "./Recipes.css";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Recipes = ({ recipes, loading }) => {
  // const recipes = useSelector((state) => state.recipes);
  // const orderedRecipes = useSelector((state) => state.orderedRecipes);

  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div>
      <div className="recipes container">
        {recipes.length ? (
          recipes.map((recipe, idx) => {
            return (
              <Link to={`/recipeDetail/${recipe.id}`} className="recipe">
                <Recipe
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

//   return (
//     <div className="Contener">
//       {orderedRecipes.length
//         ? orderedRecipes.map((recipe, idx) => {
//             return (
//               <div>
//                 <Link to={`/details/${recipe.id}`}>
//                   <Recipe
//                     key={idx}
//                     title={recipe.title}
//                     image={recipe.image}
//                     diets={recipe.diets}
//                     summary={recipe.summary}
//                   />
//                 </Link>
//               </div>
//             );
//           })
//         : recipes.data &&
//           recipes.data.map((recipe, idxc) => {
//             return (
//               <div>
//                 <Link to={`/details/${recipe.id}`}>
//                   <Recipe
//                     key={idxc}
//                     title={recipe.title}
//                     image={recipe.image}
//                     diets={recipe.diets}
//                     summary={recipe.summary}
//                   />
//                 </Link>
//               </div>
//             );
//           })}
//     </div>
//   );
// };
export default Recipes;

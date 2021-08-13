import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Details.css";
import { useEffect } from "react";
import { getRecipeByID } from "../../Redux/Actions";

export default function Detail(props) {
  const RecipeID = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipeByID(RecipeID));
  }, [dispatch, RecipeID]);

  const recipeDetail = useSelector((state) => state.recipeById);
  console.log(recipeDetail);
  return (
    <div>
      {recipeDetail.data && (
        <div>
          <div>
            <h1>{recipeDetail.data.title}</h1>
            <h3>{recipeDetail.data.summary}</h3>
            <ul>
              {recipeDetail.data.diets.map((diet) => {
                return <li>{diet}</li>;
              })}
            </ul>
            <img src={recipeDetail.data.image} alt="" />
            <ul>
              {recipeDetail.data.analyzedInstructions[0] &&
                recipeDetail.data.analyzedInstructions[0].steps &&
                recipeDetail.data.analyzedInstructions[0].steps.map((step) => {
                  return <li>{step.step}</li>;
                })}
            </ul>
            <p>{recipeDetail.data.healthScore}</p>
            <p>{recipeDetail.data.spoonacularScore}</p>
            <p>{recipeDetail.data.dishTypes}</p>
          </div>
        </div>
      )}
      <Link to="/home">Home</Link>
    </div>
  );
}

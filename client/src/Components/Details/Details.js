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
      {recipeDetail.title && (
        <div>
          <div>
            <h1>{recipeDetail.title}</h1>
            <h3>{recipeDetail.summary}</h3>
            <ul>
              {recipeDetail.diets.map((diet) => {
                return <li>{diet}</li>;
              })}
            </ul>
            <img src={recipeDetail.image} alt="" />
            <ul>
              {recipeDetail.analyzedInstructions[0] &&
                recipeDetail.analyzedInstructions[0].steps &&
                recipeDetail.analyzedInstructions[0].steps.map((step) => {
                  return <li>{step.step}</li>;
                })}
            </ul>
            <p>{recipeDetail.healthScore}</p>
            <p>{recipeDetail.spoonacularScore}</p>
            <p>
              {recipeDetail.dishTypes.length &&
                recipeDetail.dishTypes.map((e) => {
                  return <p>e</p>;
                })}
            </p>
          </div>
        </div>
      )}
      <Link to="/home">Home</Link>
    </div>
  );
}

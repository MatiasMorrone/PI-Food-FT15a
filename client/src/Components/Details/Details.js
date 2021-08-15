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

  return (
    <div>
      {recipeDetail.title && (
        <div>
          <div>
            <h1>{recipeDetail.title}</h1>
            <h3>{recipeDetail.summary}</h3>
            <ul>
              {recipeDetail.diets.map((diet, idx) => {
                return <li key={idx}>{diet}</li>;
              })}
            </ul>
            <img src={recipeDetail.image} alt="" />
            <ul>
              {recipeDetail.analyzedInstructions &&
                recipeDetail.analyzedInstructions.steps &&
                recipeDetail.analyzedInstructions.steps.map((step, idx) => {
                  return <li key={idx}>{step.step}</li>;
                })}
            </ul>
            <p>{recipeDetail.healthScore}</p>
            <p>{recipeDetail.spoonacularScore}</p>
            <p>
              {recipeDetail.dishTypes &&
                recipeDetail.dishTypes.length &&
                recipeDetail.dishTypes.map((e, idx) => {
                  return <p key={idx}>{e}</p>;
                })}
            </p>
          </div>
        </div>
      )}
      <Link to="/home">Home</Link>
    </div>
  );
}

import "./Recipe.css";

const Recipe = ({ title, image, diets, summary, spoonacularScore }) => {
  return (
    <div className="recipe">
      <div className="recipe__front">
        <div className="recipe__front--name">
          <h4>{title}</h4>
        </div>
        <div className="recipe__front--image">
          <div className="recipe__front--image--score">
            <p>Score</p>
            <p>{spoonacularScore}</p>
          </div>
          <div>
            <img src={image} alt="Image" />
          </div>
        </div>
        <div className="recipe__front--diets">
          {diets &&
            diets.map((diet, idx) => {
              return <p key={idx}>{diet}</p>;
            })}
        </div>
      </div>
      <div className="recipe__back">
        <div className="recipe__back--title">
          <h4>Summary</h4>
        </div>
        <div className="recipe__back--content">
          <p>
            {" "}
            {(summary = summary.slice(0, 400))}
            ...[More Info]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;

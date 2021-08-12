import "./Recipe.css";

const Recipe = ({ title, image, diets, summary, spoonacularScore }) => {
  return (
    <div>
      <div className="recipe">
        <div className="recipe__front">
          <div className="recipe__front--name">
            <h4>{title}</h4>
          </div>
          <div className="recipe__front--image">
            <img src={image} alt="" />
          </div>
          <div className="recipe__front--diets">
            {diets &&
              diets.map((diet, idx) => {
                return <p key={idx}>{diet}</p>;
              })}
          </div>
          <div>
            <p>{spoonacularScore}</p>
          </div>
        </div>
        {/* <div className="recipe__back">
          <div className="recipe__back--title">
            <h4>Resumen</h4>
          </div>
          <div className="recipe__back--content">
            <p> {(summary = summary.slice(0, 400))}...</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Recipe;

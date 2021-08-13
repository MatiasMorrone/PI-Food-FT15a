import { useSelector } from "react-redux";
import "./SelectDiets.css";
import { useDispatch } from "react-redux";
import { getDietsRecipes } from "../../Redux/Actions/index";

export default function SelectDiets() {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  function orderedFunction(e) {
    dispatch(getDietsRecipes(e.target.value));
  }

  return (
    <div>
      <select
        onChange={(e) => orderedFunction(e)}
        defaultValue={"Choose diet type"}
        className="selectDietas"
      >
        <option value="Choose diet type" disabled hidden>
          Choose diet type
        </option>
        {diets.data &&
          diets.data.map((e, idx) => {
            return (
              <option value={e.name} key={idx}>
                {e.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

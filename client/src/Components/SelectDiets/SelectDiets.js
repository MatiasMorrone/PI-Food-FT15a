import { useSelector } from "react-redux";
import "./SelectDiets.css";

export default function SelectDiets() {
  const diets = useSelector((state) => state.diets);
  return (
    <div>
      <select defaultValue={"Choose diet type"} className="selectDietas">
        <option value="Choose diet type" disabled hidden>
          Choose diet type
        </option>
        {diets.data &&
          diets.data.map((e, idx) => {
            return <option key={idx}>{e.name}</option>;
          })}
      </select>
    </div>
  );
}

import "./SelectOrder.css";
import { useDispatch } from "react-redux";

import {
  orderScoreUp,
  orderAZ,
  orderZA,
  orderScoreDown,
  orderHealthUp,
  orderHealthDown,
} from "../../Redux/Actions";
export default function SelectOrder() {
  const dispatch = useDispatch();

  function orderedFunction(e) {
    if (e.target.value === "AZ") {
      dispatch(orderAZ());
    } else if (e.target.value === "ZA") {
      dispatch(orderZA());
    } else if (e.target.value === "ScoreUp") {
      dispatch(orderScoreUp());
    } else if (e.target.value === "HealthUp") {
      dispatch(orderHealthUp());
    } else if (e.target.value === "HealthDown") {
      dispatch(orderHealthDown());
    } else {
      dispatch(orderScoreDown());
    }
  }
  return (
    <div>
      <select
        defaultValue={"ORDER"}
        className="select"
        onChange={(e) => orderedFunction(e)}
      >
        <option value="ORDER" disabled hidden>
          Order
        </option>
        <option value="AZ">AZ</option>
        <option value="ZA">ZA</option>
        <option value="ScoreUp">Score Up</option>
        <option value="ScoreDown">Score Down</option>
        <option value="HealthUp">Health Up</option>
        <option value="HealthDown">Health Down</option>
      </select>
    </div>
  );
}

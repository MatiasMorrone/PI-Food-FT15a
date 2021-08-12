import "./SelectOrder.css";
import { useDispatch } from "react-redux";

import { orderScore, orderAZ, orderZA } from "../../Redux/Actions";
export default function SelectOrder() {
  const dispatch = useDispatch();

  function orderedFunction(e) {
    if (e.target.value === "AZ") {
      dispatch(orderAZ());
    } else if (e.target.value === "ZA") {
      dispatch(orderZA());
    } else {
      dispatch(orderScore());
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
        <option value="Score">Score</option>
      </select>
    </div>
  );
}

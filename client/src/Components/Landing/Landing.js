import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link to="/home">
        <button className="buttonhome">HOME</button>
      </Link>
    </div>
  );
}

export default Landing;

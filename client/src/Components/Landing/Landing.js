import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link to="/home">
        <p className="buttonhome">HOME</p>
      </Link>
    </div>
  );
}

export default Landing;

import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <h1 className="tituloLanding">Cheff Master</h1>
      <Link to="/home" className="pdeHome">
        <p className="pdeHome">Home</p>
      </Link>
    </div>
  );
}

export default Landing;

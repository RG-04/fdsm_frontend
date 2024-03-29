import "./Loader.css";
import logo from "../assets/logo.png";

export default () => {
  return (
    <div className="loader bg-twhite">
      <div className="loader-box">
        <div className="loader-spinner"></div>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
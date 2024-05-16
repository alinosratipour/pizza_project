import { Link } from "react-router-dom";
import "./MenuBar.scss";

const MenuBar = () => {
  return (
    <div className="MenuBar-Container">
      <ul className="MenuItem-Container">
        <li>
          <Link  className="Home-Link" to="./">Home</Link> 
        </li>
        <li>
          <Link className="Menu-Link" to="./pizza-menu">Menu</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;

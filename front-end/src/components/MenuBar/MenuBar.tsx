import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MenuBar.scss";

const MenuBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="MenuBar-Container">
      <ul className="MenuItem-Container">
        <li>
          <Link className="Home-Link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="Menu-Link" to="/pizza-menu">
            Menu
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link className="Menu-Link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link className="Menu-Link" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;

import { useContext } from "react";
import classes from "./header.module.css";
import AuthContext from "../../store/auth-context";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = useContext(AuthContext);
  const loginHandler = () => {
    navigate("/login", { replace: true });
    console.log(location);
  };
  const logoutHandler = () => {
    ctx.setIsLoggedIn(false);
    ctx.setToken("");
  };
  return (
    <header className={classes.header}>
      <h1>Demo</h1>
      <ul>
        <li>
          <button onClick={loginHandler}>Login</button>
        </li>
        {ctx.isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;

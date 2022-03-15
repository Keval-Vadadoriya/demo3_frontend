import classes from "./header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { loginuserActions } from "../../store/actions/login-actions";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  const loginHandler = () => {
    navigate("/login", { replace: true });
    console.log(location);
  };
  const logoutHandler = () => {
    if (window.confirm("Are You Sure?")) {
      console.log("logout");
      localStorage.clear();
      dispatch(
        loginActions.setLoginStatus({
          token: "",
        })
      );
      dispatch(loginuserActions.setUser());
      navigate("/");
    }
  };
  return (
    <header className={classes.header}>
      <h1>Demo</h1>
      <ul>
        <li>
          <button onClick={loginHandler}>Login</button>
        </li>
        {token && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;

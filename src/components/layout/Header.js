import classes from "./header.module.css";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { loginuserActions } from "../../store/actions/login-actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);

  const loginHandler = () => {
    navigate("/login", { replace: true });
  };
  const logoutHandler = () => {
    if (window.confirm("Are You Sure?")) {
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
      {token && (
        <ul>
          <li>
            <Link to="/home/profile" className={classes.link}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/home/chats" className={classes.link}>
              Chats
            </Link>
          </li>
          <li>
            {role === "user" && (
              <Link to="/home/worker" className={classes.link}>
                Workers
              </Link>
            )}
          </li>
        </ul>
      )}
      {!token && (
        <button variant="outlined" onClick={loginHandler}>
          Login
        </button>
      )}
      {token && <button onClick={logoutHandler}>Logout</button>}
    </header>
  );
};

export default Header;

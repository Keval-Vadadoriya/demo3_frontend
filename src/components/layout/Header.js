import classes from "./header.module.css";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../../store/login-slice";
import { useDispatch, useSelector } from "react-redux";
import { loginuserActions } from "../../store/actions/login-actions";
import LogoutOutlinedIcon from "@mui/icons-material/Logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Button } from "@mui/material";
// import worker from "./worker.jpeg";
// import worker from "./worker.jpg";
import worker from "./log.png";

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
      <img src={worker} width="8%" height="100%" alt="jdfssd" />
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
            {role === "worker" && (
              <Link to="/home/projects" className={classes.link}>
                Projects
              </Link>
            )}
          </li>
          <li>
            {role === "user" && (
              <Link to="/home/myprojects" className={classes.link}>
                MyProjects
              </Link>
            )}
          </li>
        </ul>
      )}
      {!token && (
        <button onClick={loginHandler}>
          Login
          <LoginOutlinedIcon />
        </button>
      )}
      {token && (
        <button onClick={logoutHandler}>
          Logout
          <LogoutOutlinedIcon />
        </button>
      )}
    </header>
  );
};

export default Header;

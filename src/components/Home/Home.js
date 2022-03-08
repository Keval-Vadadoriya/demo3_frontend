import { Link, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";

const Home = () => {
  console.log("Home");
  const dispatch = useDispatch();
  const role = useSelector((state) => state.login.role);
  useEffect(() => {
    return () => {
      console.log("logout");
      localStorage.clear();

      // localStorage.removeItem("isLoggedIn");
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // localStorage.removeItem("age");
      // localStorage.removeItem("email");
      // localStorage.removeItem("name");
      // localStorage.removeItem("_id");
      dispatch(
        loginActions.setLoginStatus({
          isLoggedIn: false,
          token: "",
        })
      );
    };
  }, [dispatch]);

  return (
    <div className={classes.x}>
      <div className={classes.side1}>
        <ul>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="chats">Chats</Link>
          </li>
          {role === "user" && (
            <li>
              <Link to="worker">Workers</Link>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.side2}>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;

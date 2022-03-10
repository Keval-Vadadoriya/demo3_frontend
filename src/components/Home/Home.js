import { Link, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    socket.emit("setId", userId);
    return () => {
      console.log("logout");
      localStorage.clear();
      socket.disconnect(userId);
      socket.on("messagesss", (message) => {
        console.log(message);
      });
      dispatch(
        loginActions.setLoginStatus({
          token: "",
        })
      );
    };
  }, [dispatch]);
  console.log("Home");
  const role = useSelector((state) => state.login.role);
  const userId = useSelector((state) => state.user._id);

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

import { Link, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  socket.emit("setId", userId);
  useEffect(() => {
    return () => {
      localStorage.clear();
      socket.disconnect(userId);
      dispatch(
        loginActions.setLoginStatus({
          token: "",
        })
      );
    };
  }, []);

  return (
    <div className={classes.home}>
      <Outlet />
    </div>
  );
};
export default Home;

import { Link, Outlet } from "react-router-dom";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";
import Header from "../layout/Header";
import { getUser } from "../../store/user-slice";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  if (userId) {
    socket.emit("setId", userId);
  }
  useEffect(() => {
    // dispatch(getUser());
    return () => {
      localStorage.clear();
      socket.disconnect(userId);
      dispatch(
        loginActions.setToken({
          token: "",
        })
      );
    };
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div className={classes.home}>
        <Outlet />
      </div>
    </>
  );
};
export default Home;

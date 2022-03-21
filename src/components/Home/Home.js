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
    <div className={classes.x}>
      {/* //   <div className={classes.side1}>
    //     <Link to="profile" className={classes.link}>
    //       Profile
    //     </Link>

    //     <Link to="chats" className={classes.link}>
    //       Chats
    //     </Link>

    //     {role === "user" && ( */}
      {/* //       <Link to="worker" className={classes.link}>
    //         Workers
    //       </Link>
    //     )}
    //   </div> */}
      <div className={classes.side2}>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;

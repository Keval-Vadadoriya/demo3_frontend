import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  if (userId) {
    socket.emit("setId", userId);
  }
  useEffect(() => {
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
      <Outlet />
    </>
  );
};
export default Home;

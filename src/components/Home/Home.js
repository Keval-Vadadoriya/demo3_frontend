import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginActions } from "../../store/login-slice";
import { Box } from "@mui/system";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  const role = useSelector((state) => state.login.role);
  if (userId) {
    socket.emit("setId", userId);
  }
  useEffect(() => {
    if (role === "user") {
      navigate("/home/workers");
    }
    if (role === "worker") {
      navigate("/home/projects");
    }
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
      <Box sx={{ height: "110%", backgroundColor: "white" }}>
        <Outlet />
      </Box>
    </>
  );
};
export default Home;

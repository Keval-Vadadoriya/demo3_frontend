import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import SignupForm from "./components/forms/Signup-Form";
import LoginForm from "./components/forms/Login-Form";
import Header from "./components/layout/Header";
import Worker from "./components/worker/Worker";
import Projects from "./components/projects/Projects";
import MyProjects from "./components/my projects /MyProjects";
import MyProjectProfile from "./components/my projects /MyProjectProfile";
import ProjectProfile from "./components/projects/ProjectProfile";
import Profile from "./components/profile/Profile";
import Review from "./components/reviews/Review";
import Chat from "./components/chats/Chat";
import Chats from "./components/chats/Chats";
import Home from "./components/Home/Home";
import WorkerProfile from "./components/worker/WorkerProfile";
import Welcome from "./components/welcome/Welcome";
import Unauthorized from "./components/welcome/Unauthorized";
import NotFound from "./components/welcome/NotFound";
import { Box } from "@mui/material";

function App() {
  const token = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.login.role);

  return (
    <>
      <Box sx={{ minWidth: "xs" }}>
        <Header />
        <Routes>
          {!token && <Route path="/" element={<Welcome />} />}
          {token && <Route path="/" element={<Navigate to="home" />} />}

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {token && (
            <Route path="/home" element={<Home />}>
              <Route path="profile" element={<Profile />} />
              <Route path="chats" element={<Chat />}>
                <Route path=":workerid" element={<Chats />} />
              </Route>
              {role === "user" && (
                <Route path="workers">
                  <Route index element={<Worker />} />
                  <Route path=":workerid">
                    <Route index element={<WorkerProfile />} />
                    <Route path="review/:id" element={<Review />} />
                  </Route>
                </Route>
              )}
              {role === "user" && (
                <Route path="myprojects">
                  <Route index element={<MyProjects />} />
                  <Route path=":workerid">
                    <Route index element={<MyProjectProfile />} />
                  </Route>
                </Route>
              )}
              {role === "worker" && (
                <Route path="projects">
                  <Route index element={<Projects />} />
                  <Route path=":projectid">
                    <Route index element={<ProjectProfile />} />
                  </Route>
                </Route>
              )}
              {role === "worker" && (
                <>
                  <Route path="worker/*" element={<Unauthorized />} />
                  <Route path="myprojects/*" element={<Unauthorized />} />
                </>
              )}
              {role === "user" && (
                <Route path="projects/*" element={<Unauthorized />} />
              )}
            </Route>
          )}
          {!token && (
            <Route path="/home/*" element={<Navigate to="/login" />} />
          )}
          {role && <Route path="*" element={<NotFound />} />}
        </Routes>
        )
      </Box>
    </>
  );
}

export default App;

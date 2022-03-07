import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import SignupForm from "./components/forms/Signup-Form";
import { loginActions } from "./store/login-slice";
import LoginForm from "./components/forms/Login-Form";
import Header from "./components/layout/Header";
import Worker from "./components/worker/Worker";
import Profile from "./components/profile/Profile";
import Review from "./components/reviews/Review";
import Chat from "./components/chats/Chat";
import Home from "./components/Home/Home";
import WorkerProfile from "./components/worker/WorkerProfile";

console.log("appU");

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    dispatch(
      loginActions.setLoginStatus({
        isLoggedIn: localStorage.getItem("isLoggedIn"),
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<h1>Welcome to DemoProject</h1>} />

          <Route path="/signup" element={!isLoggedIn && <SignupForm />} />
          <Route path="/login" element={!isLoggedIn && <LoginForm />} />
          <Route path="/home" element={isLoggedIn && <Home />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chats" element={<Chat />} />
            <Route path="worker">
              <Route index element={<Worker />} />
              <Route path=":workerid">
                <Route index element={<WorkerProfile />} />
                <Route path="review/:id" element={<Review />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;

import { Fragment, useContext } from "react";
import SignupForm from "./components/forms/Signup-Form";
import LoginForm from "./components/forms/Login-Form";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import AuthContext from "./store/auth-context";
console.log("appU");

function App() {
  const ctx = useContext(AuthContext);
  console.log("App");
  return (
    <Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="" element={<h1>Welcome to Ecommerce</h1>} />

          <Route path="/signup" element={!ctx.isLoggedIn && <SignupForm />} />
          <Route path="/login" element={!ctx.isLoggedIn && <LoginForm />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;

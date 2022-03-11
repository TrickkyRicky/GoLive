import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// import ForgotPass from "./pages/auth/ForgotPass.jsx";
// import NewPass from "./pages/auth/NewPass.jsx";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404.jsx";
import Upload from "./pages/Upload";
import Stream from "./pages/Stream";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import { Routes, Route } from "react-router-dom";
import { authActions } from "./store/auth/auth-slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      return;
    }
    const userId = localStorage.getItem("userId");
    dispatch(
      authActions.LoggedIn({
        jwt: jwtToken,
        userIdLogin: userId,
      })
    );
  }, [dispatch]);

  return (
    <Routes>
      <Route path="Auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        {/* <Route path="ForgotPass" element={<ForgotPass />} />
        <Route path="NewPass/:id" element={<NewPass />} /> */}
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Upload" element={<Upload />} />

        {/* after Stream will be Stream/username */}
        <Route path="Stream/:username" element={<Stream />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;

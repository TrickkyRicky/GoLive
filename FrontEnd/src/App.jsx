import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import ForgotPass from "./pages/auth/ForgotPass.jsx";
// import NewPass from "./pages/auth/NewPass.jsx";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404.jsx";
// import Upload from "./pages/Upload";
import WatchVideo from "./pages/WatchVideo";
import Stream from "./pages/Stream";
import LikedVideos from "./pages/LikedVideos";
import SearchResults from "./pages/SearchResults";
import Clip from "./pages/Clip";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Socket1 from "./pages/Socket1";

import { Routes, Route } from "react-router-dom";
import { authActions } from "./store/auth/auth-slice";

const App = () => {
  const dispatch = useDispatch();

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    if (!jwtToken) {
      return;
    }
    const userId = localStorage.getItem("userId");

    dispatch(authActions.LoggedIn({ jwt: jwtToken, userIdLogin: userId }));
  }, [jwtToken]);

  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="ForgotPass" element={<ForgotPass />} />
        <Route path="NewPass/:id" element={<NewPass />} /> */}
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="watch/:videoId" element={<WatchVideo />} />
        <Route path="settings" element={<Settings />} />
        <Route path="liked" element={<LikedVideos />} />
        <Route path="searchresults" element={<SearchResults />} />

        <Route path="settings" element={<Settings jwt={jwtToken} />} />
        <Route path="clip" element={<Clip jwt={jwtToken} />} />

        {/* Socket Test Routes */}
        <Route path="socket1" element={<Socket1 jwt={jwtToken} />} />
        <Route path="socket2" element={<Clip jwt={jwtToken} />} />

        {/* after Stream will be Stream/username */}
        <Route path="stream/:username" element={<Stream />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;

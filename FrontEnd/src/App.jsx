import Home from "./pages/Home";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPass from "./pages/Auth/ForgotPass.jsx";
import NewPass from "./pages/Auth/NewPass.jsx";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404.jsx";
import Upload from "./pages/Upload";
import Stream from "./pages/Stream";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="Auth" element={<AuthLayout />}>
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        {/* <Route path="ForgotPass" element={<ForgotPass />} />
        <Route path="NewPass/:id" element={<NewPass />} /> */}
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="Home" element={<Home />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Upload" element={<Upload />} />

        {/* after Stream will be Stream/username */}
        <Route path="Stream/:username" element={<Stream />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPass from "./pages/Auth/ForgotPass.jsx";
import NewPass from "./pages/Auth/NewPass.jsx";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404.jsx";
import Upload from "./pages/Upload";
import Stream from "./pages/Stream";

const App = () => (
  <Routes>
    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    {/* <Route path="/ForgotPass" element={<ForgotPass />} />
    <Route path="/NewPass/:id" element={<NewPass />} /> */}

    {/* <Layout> */}
    <Route path="/" element={<Navigate replace to="/Home" />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Settings" element={<Settings />} />
    <Route path="/Upload" element={<Upload />} />
    {/* after Stream will be Stream/username */}
    <Route path="/Stream/:username" element={<Stream />} />
    <Route path="*" element={<Error404 />} />
    {/* </Layout> */}
  </Routes>
);

export default App;

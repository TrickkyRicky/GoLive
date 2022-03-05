import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404.jsx";
import Upload from "./pages/Upload";
import Stream from "./pages/Stream";

import "./App.css";

const App = () => (
  // <Layout>
  <Routes>
    <Route path="/" element={<Navigate replace to="/Home" />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Auth" element={<Auth />} />
    <Route path="/Settings" element={<Settings />} />
    <Route path="/Upload" element={<Upload />} />
    {/* after Stream will be Stream/username */}
    <Route path="/Stream/:username" element={<Stream />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
  // </Layout>
);

export default App;

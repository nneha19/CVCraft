import { Routes, Route } from "react-router-dom";

import "./App.css";
import ResumePreview from "./components/Preview/ResumePreview";
import Body from "./Routes/Body";
import Layout from "./Routes/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Body />} />
        <Route path="preview" element={<ResumePreview />} />
      </Route>
    </Routes>
  );
}

export default App;

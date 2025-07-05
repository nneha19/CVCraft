import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ResumeProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ResumeProvider>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import TetrisGame from "./TetrisGame";
import AssessmentPage from "./AssessmentPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <TetrisGame /> */}
    <AssessmentPage />
  </StrictMode>
);

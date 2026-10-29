import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ApiDay9 from "./Components/Api-day9.jsx";
// import EmployeeForm from "./Components/EmployeeForm-d10";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ApiDay9/>
    {/* <EmployeeForm/> */}
  </StrictMode>
);
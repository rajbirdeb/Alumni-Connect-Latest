import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllRoutes from "./Components/AllRoutes";

function App() {
  const role = localStorage.getItem("role");
  return (
    <AllRoutes/>
  );
}

export default App;

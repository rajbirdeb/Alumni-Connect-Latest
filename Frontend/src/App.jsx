import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homepage";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Dashboard from "./Components/Dashboard";
import CreateEvent from "./Components/CreateEvent";
import ViewEvents from "./Components/ViewEvent";
import ViewAlumini from "./Components/ViewAlumini";
import EditProfile from "./Components/EditProfile";
import About from "./Components/About";

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/view-alumni" element={<ViewAlumini />} /> {/* Corrected path */}
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<About/>}/>
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

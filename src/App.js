
// export default App;
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import MapShelters from "./Components/MapShelters";
import UserDashboard from "./Components/UserDashboard";
import EmergencyGuide from "./Components/EmergencyGuide";
import AllShelters from "./Components/AllShelters";
import AddShelter from "./Components/AddShelter";
 import AdminDashboard from "./Components/AdminDashboard";
import Profile from "./Components/Profile";
import ShowUser from "./Components/ShowUser";
import AdminShelters from "./Components/AdminShelters";
import MyShelterRequests from "./Components/MyShelterRequests";

function App() {
  return (
    <Routes>

      {/* דף הבית */}
      <Route path="/" element={<HomePage />} />

      {/* דפי התחברות והרשמה */}
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
      {/* דף של כל המיגוניות */}
      <Route path="/map" element={<MapShelters />} />
      
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/emergency" element={<EmergencyGuide />} />
      <Route path="/dashboard" element={<UserDashboard />} />

      <Route path="/all-shelters" element={<AllShelters />} /> 
    <Route path="/add-shelter" element={<AddShelter />} />
    {/* <Route path="/safe-places" element={<SafePlaces />} /> */}
    <Route path="/profile" element={<Profile />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/show-user" element={<ShowUser />} />
  <Route path="/admin-shelters" element={<AdminShelters />} />
  <Route path="/my-requests" element={<MyShelterRequests />} />

    </Routes>
  );
}

export default App;

// export default App;
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
//import AllShelters from "./Components/AllShelters";
import MapShelters from "./Components/MapShelters";
import UserDashboard from "./Components/UserDashboard";
import EmergencyGuide from "./Components/EmergencyGuide";

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
      {/* <Route path="/all-shelters" element={<AllShelters />} /> */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/emergency" element={<EmergencyGuide />} />

    </Routes>
  );
}

export default App;
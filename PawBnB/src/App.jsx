//pages
import {
  Landing,
  Home,
  SignUpOwners,
  SignUpSitters,
  SitterProfile,
  DashboardOwner,
  DashboardSitter,
  Login,
} from "./Views/indexViews";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";

function App() {
  const location = useLocation();

  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {/* {showNav && <NavBar />} */}
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
        <Route path="/sitterProfile" element={<SitterProfile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />  
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

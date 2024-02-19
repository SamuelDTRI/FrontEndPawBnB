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
  ReservationRequest,
} from "./Views/indexViews";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import DashboardAdmin from "./Views/DashboardAdmin/DashboardAdmin";

function App() {
  const location = useLocation();
 
  const user = useSelector((state) => state.auth);


  const showNav = location.pathname !== "/";
  //const showAlert = !infoSitter.completedProfille;

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
        <Route path="/dashboardOwner/:id" element={<DashboardOwner />} />
        <Route path="/sitterProfile/:id" element={<SitterProfile />} />
        <Route
          path="/reservation"
          element={user.userId ? <ReservationRequest /> : <SignUpOwners />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/:id" element={<Home />} /> 
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardAdmin/users" element={<DashboardAdmin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

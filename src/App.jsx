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
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import DashboardAdmin from "./Views/DashboardAdmin/DashboardAdmin";
import AdminLogin from "./Components/DashBoardAdmin/Login/AdminLogin";

function App() {
  const location = useLocation();
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const userDeleted = useSelector((state) => state.auth.userDeleted);
  const adminRole = useSelector((state)=> state.adminUsers.adminRole);
  const adminDeleted = useSelector((state) => state.adminUsers.adminDeleted);

  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route
          path="/dashboardSitter/:id"
          element={
            !userDeleted && userRole === "DogSitter" && userId ? (
              <DashboardSitter />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboardOwner/:id"
          element={
            !userDeleted && userRole === "Owner" && userId ? (
              <DashboardOwner />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sitterProfile/:id"
          element={
            !userDeleted && userRole === "DogSitter" && userId ? (
              <SitterProfile />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reservation"
          element={userId ? <ReservationRequest /> : <SignUpOwners />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/dashboardAdmin"
          element={
              <DashboardAdmin />
          }
        />
        <Route
          path="/dashboardAdmin/users"
          element={
              <DashboardAdmin />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

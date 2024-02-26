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
import UsersPanel from "./Components/DashBoardAdmin/UsersPanel/UserPanel";
import UserProfile from "./Components/DashBoardAdmin/UserProfile/UserProfile";
import PaymentSucces from "./Views/Payments/PaymentSucces";
import PaymentCancel from "./Views/Payments/PaymentCancel";
import PaymentCheckout from "./Views/Payments/PaymentCheckout";

function App() {
  const location = useLocation();
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const userDeleted = useSelector((state) => state.auth.userDeleted);
  const adminRole = useSelector((state) => state.adminUsers.adminRole);
  const adminDeleted = useSelector((state) => state.adminUsers.adminDeleted);

  const showNav = location.pathname !== "/";
  //const showAlert = !infoSitter.completedProfile;
  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />

        <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
        {/* !userDeleted && userRole === "DogSitter" && userId ? (
             
            ) : (
              <Navigate to="/" />
            )
          
        */}

        <Route path="/dashboardOwner/:id" element={<DashboardOwner />} />
        {/*          
            !userDeleted && userRole === "Owner" && userId ? (
              
            ) : (
              <Navigate to="/" />
            )
           */}
        <Route path="/sitterProfile/:id" element={<SitterProfile />} />
        {/* !userDeleted && userRole === "DogSitter" && userId ? (
            
            ) : (
              <Navigate to="/" />
            )
          */}

        <Route
          path="/reservation/:id"
          element={userId ? <ReservationRequest /> : <SignUpOwners />}
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Pay" element={<PaymentCheckout />} />
        <Route path="/PaySuccess" element={<PaymentSucces />} />
        <Route path="/PayCancel" element={<PaymentCancel />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />}>
          <Route path="users" element={<UsersPanel />} />
          <Route path="users/profile/:role/:id" element={<UserProfile />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

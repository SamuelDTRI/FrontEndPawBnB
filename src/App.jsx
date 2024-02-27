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
import { useDispatch, useSelector } from "react-redux";
import DashboardAdmin from "./Views/DashboardAdmin/DashboardAdmin";
import AdminLogin from "./Components/DashBoardAdmin/Login/AdminLogin";

import ComoFunciona from "./Components/ComoFunciona/ComoFunciona";
import EligePawbnb from "./Components/EligePawbnb/EligePawbnb";
import PawbnbReviews from "./Components/PawbnbReviews/PawbnbReviews";
import AyudaFaq from "./Components/AyudaFaq/AyudaFaq";

import UsersPanel from "./Components/DashBoardAdmin/UsersPanel/UserPanel";
import UserProfile from "./Components/DashBoardAdmin/UserProfile/UserProfile";
import PaymentSucces from "./Views/Payments/PaymentSucces";
import PaymentCancel from "./Views/Payments/PaymentCancel";
import PaymentCheckout from "./Views/Payments/PaymentCheckout";
import AboutUs from "./Components/AboutUs/AboutUs";
import Localidades from "./Components/Localidades/Localidades";

import { useEffect } from "react";
import { loginSuccess } from "./redux/authSlice";



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname} = useLocation();
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const userDeleted = useSelector((state) => state.auth.userDeleted);
  const adminRole = useSelector((state) => state.adminUsers.adminRole);
  const adminDeleted = useSelector((state) => state.adminUsers.adminDeleted);
  
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname]);

  useEffect(()=>{
    window.scrollTo(0,0)
    const storedUserData = localStorage.getItem('userData');
    if(storedUserData){
      const userData = JSON.parse(storedUserData);
      dispatch(loginSuccess(userData));
    }
  }, [dispatch])

  const showNav = location.pathname !== "/";
  
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

        {/* Rutas para las secciones del footer */}
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/por-que-elegir" element={<EligePawbnb />} />
        <Route path="/reviewsPawbnb" element={<PawbnbReviews />} />
        <Route path="/ayuda-faq" element={<AyudaFaq />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/localidades" element={<Localidades />} />

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

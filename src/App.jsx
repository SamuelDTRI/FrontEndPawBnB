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

import SuspensionMessage from "./Components/SuspensionMessage/SuspensionMessage";

import { useEffect } from "react";
import { loginSuccess } from "./redux/authSlice";



function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname} = useLocation();

  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const userDeleted = useSelector((state) => state.auth.userDeleted);

  const adminId = useSelector((state) => state.adminUsers.adminId);
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

  //Funciones para controlar los permisos de ingreso de los usuarios suspendidos
  const isUserSuspended = () => {
    return userId && userDeleted;
  };
  const isAdminSuspended = () => {
    return adminId && adminDeleted;
  };
  
  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        {/* Rutas publicas que todos los usuarios pueden acceder */}
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Rutas para las secciones del footer/también son rutas publicas */}
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/por-que-elegir" element={<EligePawbnb />} />
        <Route path="/reviewsPawbnb" element={<PawbnbReviews />} />
        <Route path="/ayuda-faq" element={<AyudaFaq />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/localidades" element={<Localidades />} />
        {/* Rutas privadas */}
        {userId && userRole && !userDeleted ? (
          <>
            <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
            <Route path="/dashboardOwner/:id" element={<DashboardOwner />} />
            <Route path="/sitterProfile/:id" element={<SitterProfile />} />
            <Route
              path="/reservation/:id"
              element={userId ? <ReservationRequest /> : <SignUpOwners />}
            />
            <Route path="/Pay" element={<PaymentCheckout />} />
            <Route path="/PaySuccess" element={<PaymentSucces />} />
            <Route path="/PayCancel" element={<PaymentCancel />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              isUserSuspended() ? (
                <Navigate to="/suspension-message" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        )}
        {/* Rutas para el panel de control del administrador */}
        {adminId && adminRole && !adminDeleted ? (
          <>
            <Route path="/dashboardAdmin" element={<DashboardAdmin />}>
              <Route path="users" element={<UsersPanel />} />
              <Route path="users/profile/:role/:id" element={<UserProfile />} />
            </Route>
          </>
        ) : (
          <Route
            path="*"
            element={
              isAdminSuspended() ? (
                <Navigate to="/suspension-message" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        )}
        <Route path="/suspension-message" element={<SuspensionMessage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

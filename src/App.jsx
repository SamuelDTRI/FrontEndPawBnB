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

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.auth);
  console.log(user.userId)

  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
        <Route path="/dashboardOwner/:id" element={<DashboardOwner/>} />
        <Route path="/sitterProfile/:id" element={<SitterProfile />} />
        <Route path="/reservation/:id" element={user.userId ? <ReservationRequest/> : <SignUpOwners />} />
        {/* <Route path="/reservation/:id" element={<ReservationRequest/>} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

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
  Pay,
} from "./Views/indexViews";
import { NavBar, Footer } from "./Components/indexComponents";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Route, Routes } from "react-router-dom";

function App() {
  const location = useLocation();

  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {showNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/dashboardSitter/:id" element={<DashboardSitter />} />
        <Route path="/sitterProfile/:id" element={<SitterProfile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Pay" element={<Pay />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

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
import { useSelector, useDispatch } from "react-redux";
import { sumCount, resCount } from "./redux/countSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Route, Routes } from 'react-router-dom'
import Footer from "./Components/Footer/Footer";
import { useLocation, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const sumClick = () => {
    dispatch(sumCount());
  };

  const resClick = () => {
    dispatch(resCount());
  };
  const location = useLocation();

  const showNav = location.pathname !== "/";

  return (
    <div className="App">
      {showNav && <NavBar />}
      {/* <h1>Hola xd</h1>
      <h2>Contador de ejemplo con Redux Toolkit</h2>
      <div>
        <h3>{count.count}</h3>
        <button onClick={()=>resClick()}>Anterior</button>
        <button onClick={()=>sumClick()}>Siguiente</button>
      </div> */}
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/SignUp" element={<SignUpOwners />} />
        <Route path="/SignUpSitters" element={<SignUpSitters />} />
        <Route path="/dashboardSitter" element={<DashboardSitter />} />
        <Route path="/sitterProfile" element={<SitterProfile />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

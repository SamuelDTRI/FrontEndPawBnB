import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../imagenes/logo/logo-pawbnb-horizontal.png";
import style from "./NavBar.module.css";
import { UserAuth } from "../../context/AuthContext";
import { logOutUser } from "../../redux/authSlice.js";

const NavBar = () => {
  const {googleUser, googleLogOut} = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userRole);

  const handleSignOut = async ()=>{
    try {
      // deslogueo de google
      await googleLogOut();
      //deslogueo local
      dispatch(logOutUser());
      //redireccionamiento a Home
      navigate("/Home");
    } catch(error){
      console.log("Error: ", error);
    }
  }
  const handleSingUpRedir= ()=>{
    navigate("/SignUp");
  }
  const handleLoginRedir = () => {
    navigate("/Login");
  };
  return (
    <div className="container-fluid">
      <nav className="navbar fixed-top border-bottom bg-white">
        <div className={style.imagen}>
          <img src={logo} alt="PawBnb" />
        </div>
        <div className="m-auto">
          {" "}
          <SearchBar />
        </div>

        <div className="col-12 col-md-3 m-1">
          {googleUser || userRole ? (
            <button
              className="btn border-warning text-warning"
              onClick={handleSignOut}>
              LogOut
            </button>
          ) : (
            <>
              <button
                className="btn  me-2 border-warning text-warning"
                onClick={handleSingUpRedir}>
                Regístrate
              </button>
              <button
                className="btn border-warning text-warning"
                onClick={handleLoginRedir}>
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

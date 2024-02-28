import {Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../imagenes/logo/logo-pawbnb-horizontal.png";
import style from "./NavBar.module.css";
import { UserAuth } from "../../context/AuthContext";
import { logOutUser } from "../../redux/authSlice.js";
import Alerts from "../Alerts/Alerts.jsx";

const NavBar = () => {
  const {googleUser, googleLogOut} = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userRole);
  const adminRole = useSelector((state) => state.adminUsers.adminRole )
  const idUsuarioActual = useSelector((state) => state.auth.userId)
  console.log(adminRole)
  const logOutButtonText= " SALIR";
  const registerButtonText = "REGISTRATE";
  const loginButtonText = "INGRESAR";

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

const handleClickMiPerfil=(userRole)=>{
  if(userRole==="Owner"){
    navigate(`dashboardOwner/${idUsuarioActual}`)
  }
  if(userRole==="DogSitter"){
  navigate(`dashboardSitter/${idUsuarioActual}`)
  }
}

  return (
    <div className={`container-fluid ${style.navbar}`}>
      <nav className="navbar border-bottom bg-white">
        {userRole ==='DogSitter' ? (
        <div className={style.imagen}>
            <img src={logo} alt="PawBnb" />
        </div>
        ) : (
        <div className={style.imagen}>
          <Link to="/">
            <img src={logo} alt="PawBnb" />
          </Link>
        </div>
        )}

        {/* BLOQUEAR BOTON DE HOME PARA CUIDADORES */}
        {userRole === 'Owner' &&
          <button onClick={() => navigate("Home")}>HOME</button>
        }
        {!userRole &&
          <button onClick={() => navigate("Home")}>HOME</button>
        }

        {/* <button onClick={handleClickMiPerfil}>MI PERFIL</button> */}
        <div className="col-12 col-md-3 m-1">
          {googleUser || userRole ? (
            <div className="d-flex col-12">
              {userRole !== "Admin" && (
                <button
                  className={`col-4 ${style.BtMiPerfil}`}
                  onClick={() => handleClickMiPerfil(userRole)}>
                  Mi perfil
                </button>
              )}
              <button
                className={`btn border-warning border-2 text-warning fw-bold col-4 ${style.BtSalir}`}
                onClick={handleSignOut}>
                <span className="iconButton ">
                  <i className="bi bi-box-arrow-right"></i>
                </span>
                {`${logOutButtonText}`}
              </button>
            </div>
          ) : (
            <div className={style.loginButtonContainer}>
              <button onClick={handleSingUpRedir}>
                {`${registerButtonText}`}
              </button>
              <button
                className={`btn border-warning border-2 text-warning fw-bold col-4 ${style.BtSalir}`}
                onClick={handleLoginRedir}>
                {`${loginButtonText}`}
              </button>
            </div>
          )}
        </div>
      </nav>
      <Alerts />
    </div>
  );
};

export default NavBar;

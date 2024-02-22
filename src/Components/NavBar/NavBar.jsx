import {Link, useNavigate } from "react-router-dom";
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
  const adminRole = useSelector((state) => state.adminUsers.adminRole )
  const idUsuarioActual = useSelector((state) => state.auth.userId)

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
        <div className={style.imagen}>
          <Link to="/">
            <img src={logo} alt="PawBnb" />
          </Link>
        </div>

        <button onClick={()=>navigate("Home")}>HOME</button>
        {/* <button onClick={handleClickMiPerfil}>MI PERFIL</button> */}
 
        <div className="col-12 col-md-3 m-1">
          {googleUser || userRole || adminRole ?      
          (
            <div className="d-flex col-12">
             <button className={`col-7 ${style.BtMiPerfil}`}
              onClick={()=>handleClickMiPerfil(userRole)}
             >
              Mi perfil
            </button>
            <button
              className={`btn border-warning text-warning col-4 ${style.BtSalir}`}
              onClick={handleSignOut}>
              <span className="iconButton">
                <i className="bi bi-box-arrow-right"></i>
              </span>
              {`${logOutButtonText}`}
            </button> 
            </div>
          )
          : (
            <>
              <button
                onClick={handleSingUpRedir}>
                {`${registerButtonText}`}
              </button>
              <button
                className={style.botones}
                onClick={handleLoginRedir}>
                {`${loginButtonText}`}
              </button>
            </>
          )}
        </div>
       
      </nav>
    </div>
  );
};

export default NavBar;

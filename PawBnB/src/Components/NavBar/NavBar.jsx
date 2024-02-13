import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../imagenes/logo/logo-pawbnb-horizontal.png";
import style from "./NavBar.module.css";
import { UserAuth } from "../../context/AuthContext";
import { logOutUser } from "../../redux/authSlice.js";

const NavBar = () => {
  const {googleUser, googleLogOut} = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userRole = useSelector((state) => state.auth.userRole);
  console.log(userRole)

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
  return (
    <div className="container-fluid">
      <nav className="navbar fixed-top border-bottom bg-white">
        <div className={style.imagen}>
          <Link to="/"><img src={logo} alt="PawBnb" /></Link>
        </div>
        <div className="m-auto">
          {" "}
          <SearchBar />
        </div>

        <div className="col-12 col-md-3 m-1">
          {(googleUser||userRole)? (<button className="btn border-warning text-warning"
                                  onClick={handleSignOut}>
                                    LogOut</button>):
          (<>
            <Link to="/SignUp"><button className="btn  me-2 border-warning text-warning">
              Sign up
            </button>
            </Link>
            <Link to="/Login"><button className="btn border-warning text-warning">Login</button></Link>
          </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

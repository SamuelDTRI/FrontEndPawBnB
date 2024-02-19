import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import logo from "../imagenes/logo/logo-pawbnb-horizontal.png"
import style from "./NavBar.module.css"
const NavBar = () => {  
return (
  <div className="container-fluid">
    <nav className="navbar fixed-top border-bottom bg-white">
        
        <div className={style.imagen}><img src={logo} alt="PawBnb" /></div>
        <div className="m-auto"> <SearchBar /></div>

      <div className="col-12 col-md-3 m-1">
      <button className="btn  me-2 border-warning text-warning">Sign up</button>
      <button className="btn border-warning text-warning">Login</button>
      </div>

    </nav>
 </div>
 );
};

export default NavBar;

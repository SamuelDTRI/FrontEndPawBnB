import React, { useState } from "react";
import style from "./SearchBar.module.css"

const SearchBar = () => {
const [cuidador, setCuidador] = useState("")

  const handleChange=(event)=>{
    setCuidador(event.target.value)
  }

  const handleSubmit=(event)=>{
   console.log(cuidador)
   //ACA IRA LA LOGICA, NECESITO TENER ALGUNAS RUTAS DEL BACK
  }
  return (
      <div className={style.contenedor}>
        <div className={style.searchbar}>
       <input type="text" placeholder="Encuentra un cuidador..." onChange={handleChange}/>    
      <button onClick={handleSubmit}>🔎</button>
      </div>
      </div>
  )
};

export default SearchBar;
  
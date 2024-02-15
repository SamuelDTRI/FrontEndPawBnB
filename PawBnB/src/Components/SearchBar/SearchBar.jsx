import React, { useState } from "react";
import style from "./SearchBar.module.css"
import { Barrios } from "../../Helpers/Barrios";
import { useNavigate} from "react-router-dom";

const SearchBar = () => {
const navigate = useNavigate();
const [barrio, setBarrio] = useState("")
const [barrioCargado,setBarrioCargado] = useState("Selecciona un Barrio ") 
const [mostrarOpciones, setMostrarOpciones] = useState(false)

const handleChange=(event)=>{
setBarrio(event.target.value)
}

  const handleSubmit=(event)=>{
   navigate("/Home")
   //ACA IRA LA LOGICA, NECESITO TENER ALGUNAS RUTAS DEL BACK
  }

  const barriosFiltrados = Barrios.filter((barrioInd)=>
  barrioInd.toLowerCase().startsWith(barrio.toLowerCase()
  ))

  const handlePositionClick=(event)=>{
    console.log(event.target.outerText)
    setBarrioCargado(event.target.outerText)
  }

  const handleMostrarOpciones=()=>{
    mostrarOpciones===false
    ? setMostrarOpciones(true)
    : setMostrarOpciones(false) 
  }

  return (
      <div className={style.contenedorPpal}>
        <div className={style.contenedorObjetitos}>
           <div className={style.ContenedorSeleccionaBarrio}>
             <span 
                 onClick={handleMostrarOpciones} className={style.spann}><i className="bi bi-geo-alt"></i> {barrioCargado}</span> 
           </div>
           <button onClick={handleSubmit}>Buscar</button> 
        </div>
  
       { mostrarOpciones===true &&  
          <div className={style.contenedorBuscador}>
            <div>
              <input type="text" className={style.input} onChange={handleChange}
              placeholder="Nombre del barrio..." />  
            </div>
        
          <ul className="options">
          {
            barriosFiltrados.map((barrio) =>(
              <li key={barrio} onClick={handlePositionClick} className={style.lista}>{barrio}
              </li>
            )) 
          }
          </ul>
          </div>
        }
      </div>

  )
};

export default SearchBar;
  
import React, { useState, useEffect } from "react";
import style from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { addDogsister } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SearchBar = () => {
  const navigate = useNavigate();
  const [barrio, setBarrio] = useState("");
  const [barrioCargado, setBarrioCargado] = useState("Selecciona un Barrio ");
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [barriosEnUso, setBarriosEnUso] = useState([]);
  const dispatch = useDispatch();
  const dogSitters = useSelector((state) => state.dogsister.copyDogsisters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://backendpawbnb-production.up.railway.app/sitters');
        dispatch(addDogsister(data));
        const uniqueBarrios = [...new Set(data.map(cuidador => cuidador.neighborhood))];
        setBarriosEnUso(uniqueBarrios);
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleChange = (event) => {
    setBarrio(event.target.value);
  };

  const handleSubmit = (event) => {
    navigate("/Home", {state: {dato: {}}});
    // Aquí irá la lógica para buscar según el barrio seleccionado
  };

  const handlePositionClick = (event) => {
    setBarrioCargado(event.target.outerText);
  };

  const handleMostrarOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  return (
    <div className={style.contenedorPpal}>
      <div className={style.contenedorObjetitos}>
        <div className={style.ContenedorSeleccionaBarrio}>
          <span onClick={handleMostrarOpciones} className={style.spann}>
            <i className="bi bi-geo-alt"></i> {barrioCargado}
          </span> 
        </div>
        <button onClick={handleSubmit}>
          <i className="bi bi-search"></i> Buscar
        </button> 
      </div>

      {mostrarOpciones &&  
        <div className={style.contenedorBuscador}>
          <div>
            <input type="text" className={style.input} onChange={handleChange} placeholder="Nombre del barrio..." />  
          </div>
        
          <ul className="options">
            {barriosEnUso.map((barrio) => (
              <li key={barrio} onClick={handlePositionClick} className={style.lista}>{barrio}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default SearchBar;
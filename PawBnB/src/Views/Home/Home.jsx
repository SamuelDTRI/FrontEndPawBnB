import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { addDogsister, setLocationFilter } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ContainerHome } from "./home.style";

const Home = () => {
  const dispatch = useDispatch();

  const locationFilter = useSelector((state) => state.dogsister.locationFilter);
  const dateFilter = useSelector((state) => state.dogsister.dateFilter);
  const priceFilter = useSelector((state) => state.dogsister.priceFilter);
  const reviewFilter = useSelector((state) => state.dogsister.reviewFilter);

  useEffect(() => {
    const dogsisterAsync = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/sitters');
        dispatch(addDogsister(data));
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }

    dogsisterAsync();
  }, [])

  const handleLocationFilter = () => {
    dispatch(setLocationFilter(event.target.value));
  };

  const handleDateFilter = () => {

  };

  const handlePriceFilter = () => {

  };

  const handleReviewFilter = () => {

  }



  return (
    <ContainerHome>
      <div className="filters">

        <div className="filter-section">
          <h3>Ordenar por Ubicación</h3>{/* 
          <button onClick={handleLocationFilter}>Ubicación</button> */}
          <p>Filtro por equipo:</p>
                <select className='selectBox' onChange={handleLocationFilter}>
                    <option>-Seleccione equipo-</option>
                    <option value="all">Todos</option>
                    <option value="Lanus">Lanus</option>
                    <option value="Ramos">Ramos Mejia</option>
                </select>
        </div>

        <div className="filter-section">
          <h3>Ordenar por Fechas</h3>
          <button onClick={handleDateFilter}>Fecha</button>
        </div>

        <div className="filter-section">
          <h3>Ordenar por Precios</h3>
          <button onClick={handlePriceFilter}>Precios</button>
        </div>

        <div className="filter-section">
          <h3>Ordenar por Review</h3>
          <button onClick={handleReviewFilter}>Review</button>
        </div>

      </div>

      <Cards />
    </ContainerHome>
  );
};

export default Home;

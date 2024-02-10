import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocationFilter, setDateFilter, setPriceFilter, setReviewFilter } from './dogsisterSlice';

const Home = () => {
  const locationFilter = useSelector((state) => state.dogsister.locationFilter);
  const dateFilter = useSelector((state) => state.dogsister.dateFilter);
  const priceFilter = useSelector((state) => state.dogsister.priceFilter);
  const reviewFilter = useSelector((state) => state.dogsister.reviewFilter);

  const dispatch = useDispatch();

  const handleLocationFilter = () => {
    // Usar el valor de locationFilter y dispatch(setLocationFilter(nuevoValor))
  };

  const handleDateFilter = () => {
    // Usar el valor de dateFilter y dispatch(setDateFilter(nuevoValor))
  };

  const handlePriceFilter = () => {
    // Usar el valor de priceFilter y dispatch(setPriceFilter(nuevoValor))
  };

  const handleReviewFilter = () => {
    // Usar el valor de reviewFilter y dispatch(setReviewFilter(nuevoValor))
  };

  return (
    <div>
      <div className="filters">

        <div className="filter-section">
          <h3>Ordenar por Ubicación</h3>
          <button onClick={handleLocationFilter}>Ubicación</button>
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
    </div>
  );
};

export default Home;

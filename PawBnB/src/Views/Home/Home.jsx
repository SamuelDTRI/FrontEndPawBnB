import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useEffect, useState } from "react";
import { addDogsister, setLocationFilter } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ContainerHome } from "./home.style";

const Home = () => {
  const dispatch = useDispatch();

  const dogsisters = useSelector((state) => state.dogsister.copyDogsisters);
  const priceFilter = useSelector((state) => state.dogsister.priceFilter);

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

  const handlePriceFilter = (event) => {
    const selectedOption = event.target.value;

    // Define los rangos de precios
    const priceRanges = {
      "0-10000": { min: 0, max: 10000 },
      "10001-20000": { min: 10001, max: 20000 },
      "20001-50000": { min: 20001, max: 50000 },
    };

    // Actualiza el estado de priceFilter según la opción seleccionada
    setPriceFilter(priceRanges[selectedOption]);
  };


  // Obtener ciudades únicas
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
    if (dogsisters.length > 0) {
      const cities = [...new Set(dogsisters.map(dogSister => dogSister.city))];
      setUniqueCities(cities);
    }
  }, [dogsisters]);


  return (
    <ContainerHome>
      <div className="filters">

        <div className="filter-section">
          <h3>Ordenar por Ubicación</h3>
          <p>Filtro por equipo:</p>
                <select className='selectBox' onChange={handleLocationFilter}>
                    <option>-Seleccione equipo-</option>
                    <option value="all">Todos</option>
                    {uniqueCities.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                </select>
        </div>

        <div className="filter-section">
          <h3>Ordenar por Precios</h3>
          <select className='selectBox' onChange={handlePriceFilter}>
            <option value="0-10000">0-10.000 ARS</option>
            <option value="10001-20000">10.001-20.000 ARS</option>
            <option value="20001-50000">20.001-50.000 ARS</option>
          </select>
        </div>

      </div>

      <Cards priceFilter={priceFilter}/>
    </ContainerHome>
  );
};

export default Home;

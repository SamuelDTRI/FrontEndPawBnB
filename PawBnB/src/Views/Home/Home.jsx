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

  const handlePriceFilter = () => {

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
          <button onClick={handlePriceFilter}>Precios</button>
        </div>

      </div>

      <Cards />
    </ContainerHome>
  );
};

export default Home;

import React from "react";
import { useEffect, useState } from "react";
import { setLocationFilter, setPriceFilter } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContainerFilter } from "./filter.styled";

const Filter = () => {
    const dispatch = useDispatch();
    
    const dogsisters = useSelector((state) => state.dogsister.dogsisters);

    const handleLocationFilter = (event) => {
        dispatch(setLocationFilter(event.target.value));
    };

    const handlePriceFilter = (event) => {
        const minRates = parseInt(document.getElementById('minRates').value);
        const maxRates = parseInt(document.getElementById('maxRates').value);

        dispatch(setPriceFilter({ minRates, maxRates }));
    };


    // Obtener ciudades únicas
    const [uniqueCities, setUniqueCities] = useState([]);

    useEffect(() => {
        if (dogsisters.length > 0) {
        const cities = [...new Set(dogsisters.map(dogSister => dogSister.city))];
        setUniqueCities(cities);
        }
    }, [dogsisters]);

    return(
        <ContainerFilter>
            <div className="filterCity">
                <p>Filtro por ciudad:</p>
                <select className='selectBox' onChange={handleLocationFilter}>
                    <option>-Seleccione ubicación-</option>
                    <option value="all">Todos</option>
                    {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <div className="filterPrices">
                <h3>Filtrar por Precios</h3>
                
                <input type="text" name="minRates" id="minRates" placeholder="Mínimo" />
                <input type="text" name="maxRates" id="maxRates" placeholder="Máximo" />
                <button onClick={handlePriceFilter}>Filtrar</button>
            </div>
        </ContainerFilter>
    )
}

export default Filter;
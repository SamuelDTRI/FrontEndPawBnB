import React from "react";
import { useEffect, useState } from "react";
import { setLocationFilter, setPriceFilter } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContainerFilter } from "./filter.styled";
import filterIcon from '../../assets/img/filterIcon.svg';
import mapIcon from '../../assets/img/mapIcon.svg';
import dolarIcon from '../../assets/img/dollarIcon.svg';
import arrowIcon from '../../assets/img/arrowDown.svg';
import star from '../../assets/img/star.svg';

const Filter = () => {
    const dispatch = useDispatch();
    
    const dogsisters = useSelector((state) => state.dogsister.dogsisters);
    let select = null;
    const handleLocationFilter = (event) => {
        if(event.target.value == 'all'){
            select = null;
            dispatch(setLocationFilter(event.target.value));
        }else{
            select = true;
            dispatch(setLocationFilter(event.target.value));
        }
    };

    const handlePriceFilter = (event) => {
        const minRates = parseInt(document.getElementById('minRates').value);
        const maxRates = parseInt(document.getElementById('maxRates').value);

        dispatch(setPriceFilter({ minRates, maxRates }));
    };


    // Obtener ciudades únicas
    const [uniqueNeighborhood, setUniqueNeighborhood] = useState([]);

    useEffect(() => {
        if (dogsisters.length > 0) {
        const neighborhood = [...new Set(dogsisters.map(dogSister => dogSister.neighborhood))];
        setUniqueNeighborhood(neighborhood);
        }
    }, [dogsisters]);

    return(
        <ContainerFilter>
            <div className="filter-title"><img src={filterIcon} alt="filterIcon" /><span>FILTROS</span></div>
            <div className="filters">
                <div className="filter filter-city">
                    <div className="city-title">
                        <img src={mapIcon} alt="mapIcon" />
                        <p className="city-ubi">Ubicación</p>
                    </div>
                    <div className="select">
                        <select className='select-box' onChange={handleLocationFilter}>
                            <option value="all">Todos</option>
                            {uniqueNeighborhood.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                        {
                            select?
                            <div className="arrow">
                                <p>X</p>
                            </div>:
                            <div className="arrow">
                                <img src={arrowIcon} alt="arrow down" />
                            </div>
                            
                        }
                    </div>
                </div>

                <div className="filter filter-rates">
                    <div className="rates-title"><img src={dolarIcon} alt="dolarIcon" /><span>Precios</span></div>
                    <div className="rates-inputs">
                        <input className="input-rates" type="text" name="minRates" id="minRates" placeholder="Mínimo" />
                        <input className="input-rates" type="text" name="maxRates" id="maxRates" placeholder="Máximo" />
                        <button className="btn-rates" onClick={handlePriceFilter}>Filtrar</button>
                    </div>
                </div>

                <div className="filter filter-city">
                    <div className="city-title">
                        <img src={star} alt="mapIcon" />
                        <p className="city-ubi">Rating</p>
                    </div>
                    <div className="select">
                        <select className='select-box'>
                            <option value="all">Todos</option>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                        <div className="arrow">
                                <img src={arrowIcon} alt="arrow down" />
                        </div>
                    </div>
                </div>
            </div>
        </ContainerFilter>
    )
}

export default Filter;
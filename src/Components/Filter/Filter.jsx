import React from "react";
import { useEffect, useState } from "react";
import { setFilters } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContainerFilter } from "./filter.styled";
import filterIcon from '../../assets/img/filterIcon.svg';
import mapIcon from '../../assets/img/mapIcon.svg';
import dolarIcon from '../../assets/img/dollarIcon.svg';
import arrowIcon from '../../assets/img/arrowDown.svg';
import star from '../../assets/img/star.svg';

const Filter = () => {
    const dispatch = useDispatch();
    
    const dogsisters = useSelector((state) => state.dogsister.copyDogsisters);

    // Obtener ciudades únicas
    const [uniqueNeighborhood, setUniqueNeighborhood] = useState([]);
    // desabilita boton de filtro
    const [btnDisable, setBtnDisable] = useState(true);
    // desabilita boton de restauracion del filtro
    const [btnDisableRes, setBtnDisableRes] = useState(true);

    useEffect(() => {
        if (dogsisters.length > 0) {
        const neighborhood = [...new Set(dogsisters.map(dogSister => dogSister.neighborhood))];
        setUniqueNeighborhood(neighborhood);
        }
    }, [dogsisters]);

    const handleFilters = () => {
        const objFilter = {location:null, price:null};

        if(document.getElementById('location').value){

            if(document.getElementById('location').value == 'all'){
                document.getElementById('location').style.backgroundColor='#FFFFFF';
                document.getElementById('location').style.border='0px solid #ffa726';

                objFilter.location = document.getElementById('location').value;
            }else{
                document.getElementById('location').style.backgroundColor='#ffa72615';
                document.getElementById('location').style.border='2px solid #ffa726';

                objFilter.location = document.getElementById('location').value;
            }
        }

        if(document.getElementById('minRates').value && document.getElementById('maxRates').value){
            const minRates = parseInt(document.getElementById('minRates').value);
            const maxRates = parseInt(document.getElementById('maxRates').value);

            if(minRates < maxRates){
                objFilter.price = { minRates:minRates, maxRates:maxRates };
                setBtnDisableRes(false);
                document.getElementById('btnFilterPriceRest').style.cursor='pointer';
                document.getElementById('btnFilterPriceRest').style.backgroundColor='#ffa726';
                document.getElementById('maxRates').style.backgroundColor='#ffa72615';
                document.getElementById('minRates').style.backgroundColor='#ffa72615';
                document.getElementById('maxRates').style.border='2px solid #ffa726';
                document.getElementById('minRates').style.border='2px solid #ffa726';
            }
        }

        dispatch(setFilters(objFilter));
    }

    const textFilter = () => {
        const minRates = parseInt(document.getElementById('minRates').value);
        const maxRates = parseInt(document.getElementById('maxRates').value);

        if(minRates >= 0 && maxRates >= 0){
            if(minRates<maxRates){
                document.getElementById('btnFilterPrice').style.backgroundColor='#ffa726';
                document.getElementById('btnFilterPrice').style.cursor='pointer';
                document.getElementById('minRates').style.border='0px solid red';
                document.getElementById('minRates').style.backgroundColor='#FFFFFF';
                document.getElementById('maxRates').style.border='0px solid red';
                document.getElementById('maxRates').style.backgroundColor='#FFFFFF';
                setBtnDisable(false);
            }else{
                document.getElementById('btnFilterPrice').style.backgroundColor='#ffa72640';
                document.getElementById('btnFilterPrice').style.cursor='default';
                document.getElementById('minRates').style.border='2px solid red';
                document.getElementById('minRates').style.backgroundColor='#c1121f50';
                document.getElementById('maxRates').style.border='2px solid red';
                document.getElementById('maxRates').style.backgroundColor='#c1121f50';
            }
        }
    }

    const cleanFilterRates = () => {
        const objFilter = {location:null, price:null};
        objFilter.location = document.getElementById('location').value;
        //rates clean
        document.getElementById('minRates').value = null;
        document.getElementById('maxRates').value = null;
        document.getElementById('minRates').style.border='0px solid red';
        document.getElementById('minRates').style.backgroundColor='#FFFFFF';
        document.getElementById('maxRates').style.border='0px solid red';
        document.getElementById('maxRates').style.backgroundColor='#FFFFFF';
        //btn rates clean
        document.getElementById('btnFilterPrice').style.backgroundColor='#ffa72640';
        document.getElementById('btnFilterPrice').style.cursor='default';
        //btn restauration rates clean
        document.getElementById('btnFilterPriceRest').style.backgroundColor='#ffa72640';
        document.getElementById('btnFilterPriceRest').style.cursor='default';
        setBtnDisableRes(true);

        dispatch(setFilters(objFilter));
    }

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
                        <select className='select-box' id="location" onChange={handleFilters}>
                            <option value="all">Todos</option>
                            {uniqueNeighborhood.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                        <div className="arrow">
                            <img src={arrowIcon} alt="arrow down" />
                        </div>
                    </div>
                </div>

                <div className="filter filter-rates">
                    <div className="rates-title"><img src={dolarIcon} alt="dolarIcon" /><span>Precios</span></div>
                    <div className="rates-inputs">
                        <input className="input-rates" onChange={textFilter} type="text" name="minRates" id="minRates" placeholder="Mínimo" />
                        <input className="input-rates" onChange={textFilter} type="text" name="maxRates" id="maxRates" placeholder="Máximo" />
                        <button className="btn-rates" id="btnFilterPrice" disabled={btnDisable} onClick={handleFilters}>Filtrar</button>
                    </div>
                        <button className="btn-rates-rest" id="btnFilterPriceRest" disabled={btnDisableRes} onClick={cleanFilterRates}>Restablecer</button>
                </div>

                {/* <div className="filter filter-city">
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
                </div> */}
            </div>
        </ContainerFilter>
    )
}

export default Filter;
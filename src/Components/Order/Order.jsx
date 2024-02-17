import React from "react";
import { ContainerOrder } from "./order.styled";
import arrowIcon from '../../assets/img/arrowDown.svg';
import { useDispatch } from "react-redux";
import { setOrder } from "../../redux/dogsisterSlice";
import order from "../../assets/img/order.svg";

const Order = () => {
    const dispatch = useDispatch();

    const handlerOrder = () => {
        if(document.getElementById('order').value){
            dispatch(setOrder(document.getElementById('order').value))
        }
    }

    return(
        <ContainerOrder>
            <div className="text"><img src={order} alt="" /><p>Ordenar por:</p></div>
            <div className="select">
                <select id="order" className='select-box' onChange={handlerOrder}>
                    <option value="">Selecciona un orden</option>
                    <option value="orderNameA">Nombre de A a Z</option>
                    <option value="orderNameD">Nombre de Z a A</option>
                    <option value="orderRatesA">Precio: de menor a mayor</option>
                    <option value="orderRatesD">Precio: de mayor a menor</option>
                </select>
                <div className="arrow">
                        <img src={arrowIcon} alt="arrow down" />
                </div>
            </div>
        </ContainerOrder>
    )

}

export default Order;
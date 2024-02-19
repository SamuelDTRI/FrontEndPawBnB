import React from "react";
import { ContainerOrder } from "./order.styled";
import { useDispatch } from "react-redux";
import { setOrder } from "../../redux/dogsisterSlice";

const Order = () => {
    const dispatch = useDispatch();

    const handlerOrder = () => {
        if(document.getElementById('order').value == 'default'){
            document.getElementById('order').style.backgroundColor='#FFFFFF';
            document.getElementById('order').style.border='0px solid #ffa726';

        }else{
            document.getElementById('order').style.backgroundColor='#ffa72615';
            document.getElementById('order').style.border='2px solid #ffa726';

            dispatch(setOrder(document.getElementById('order').value))
        }
    }

    return(
        <ContainerOrder>
            <div className="text"><i className="bi bi-sort-alpha-down"></i><p>Ordenar por:</p></div>
            <div className="select">
                <select id="order" className='select-box' onChange={handlerOrder}>
                    <option value="default">Selecciona un orden</option>
                    <option value="orderNameA">Nombre de A a Z</option>
                    <option value="orderNameD">Nombre de Z a A</option>
                    <option value="orderRatesA">Precio: de menor a mayor</option>
                    <option value="orderRatesD">Precio: de mayor a menor</option>
                </select>
                <div className="arrow">
                    <i className="bi bi-caret-down-fill"></i>
                </div>
            </div>
        </ContainerOrder>
    )

}

export default Order;
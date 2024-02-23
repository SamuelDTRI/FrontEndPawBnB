import React from "react";
import { Link } from 'react-router-dom';
import { ContainerCard } from "./card.styled";


const Card = ({image, name,neighborhood, rating, id, city, rates}) => {
  
  return (
    <ContainerCard>
      <div className="imgContainer">
        <img src={image} alt="" />
      </div>
      <div className="infoContainer">
        <div className="infoName">
          <p>{name}</p>
          <p>Tarifa ${rates}</p>
          <p>{neighborhood}, {city}</p>
        </div>
        <div className="infoReview">
          <p>{rating}</p>
        </div>
        <div className="infoBtn">
          <Link to={`/reservation/${id}`}>
          <button className="btnBooking">Reservar ahora</button>
          </Link>
          <Link to={`/sitterProfile/${id}`}>
            <button className="btnProfile">Ver perfil</button>
          </Link>
        </div>
      </div>
    </ContainerCard>
  );
};

export default Card;

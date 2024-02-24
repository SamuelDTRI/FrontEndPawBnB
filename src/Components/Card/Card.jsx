import React from "react";
import { Link } from 'react-router-dom';
import { ContainerCard } from "./card.styled";
import { useNavigate } from "react-router-dom";

const Card = ({image, name,neighborhood, rating, id, city, rates}) => {
  const navigate = useNavigate();

  const reservation = () => {
    navigate(`/reservation/${id}`);
   }

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
          <button className="btnBooking" onClick={reservation}>Reservar ahora</button>
          <Link to={`/sitterProfile/${id}`}>
            <button className="btnProfile">Ver perfil</button>
          </Link>
        </div>
      </div>
    </ContainerCard>
  );
};

export default Card;

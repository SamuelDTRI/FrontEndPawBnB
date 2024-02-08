import React from "react";
import { ContainerCard } from "./card.styled";

const Card = ({image, name, city}) => {
  return (
    <ContainerCard>
      <div className="imgContainer">
        <img src={image} alt="" />
      </div>
      <div className="infoContainer">
        <div className="infoName">
          <p>{name}</p>
          <p>{city}</p>
        </div>
        <div className="infoReview">
          <p>⭐⭐⭐⭐</p>
        </div>
        <div className="infoBtn">
          <button className="btnBooking">Reservar ahora</button>
          <button className="btnProfile">Ver perfil</button>
        </div>
      </div>
    </ContainerCard>
  );
};

export default Card;

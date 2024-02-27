import React from "react";
import { Link } from "react-router-dom";
import { ContainerCard } from "./card.styled";
import axios from "axios";

const Card = ({image, name,neighborhood, rating, id, city, rates, review}) => {
  const navigate = useNavigate();
  const reservation = () =>{
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
          <p>
            {neighborhood}, {city}
          </p>
        </div>
        <div className="infoReview">
          <p className="star">{rating}</p>
          <p className="review">({review})</p>
        </div>
        <div className="infoBtn">
          <Link to = {`/reservation/${id}`}>
          <button className="btnBooking" /*onClick={handlePayment}*/>
            Reservar ahora
          </button>
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

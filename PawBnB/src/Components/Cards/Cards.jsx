import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { ContainerCards } from "./cards.styled";

const Cards = () => {
  const dogsisters = useSelector((state) => state.dogsister.dogsisters);
  
  return (
    <ContainerCards>
      <h2>Cuidadores en CABA</h2>
      <div className="cards">
        {dogsisters.map((allDogsister) => (
          <Card
          key={allDogsister?.id}
          image={allDogsister?.photos.url}
          name={allDogsister?.name}
          city={allDogsister?.city}
          rating={'⭐⭐⭐'}
        />
        ))}
      </div>
    </ContainerCards>
  );
};

export default Cards;

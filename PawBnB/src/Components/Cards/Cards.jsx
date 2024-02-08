import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const dogsisters = useSelector((state) => state.dogsisters);
  
  return (
    <div>
      <h2>Cuidadores en CABA</h2>
      <div>
        {dogsisters.map((allDogsister) => (
          <Card
          key={allDogsister?.id}
          image={allDogsister?.image?.url}
          name={allDogsister?.name}
          city={allDogsister?.city}
          //aca deberi ir las review
        />
        ))}
      </div>
    </div>
  );
};

export default Cards;

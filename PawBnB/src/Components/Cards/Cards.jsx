import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { ContainerCards } from "./cards.styled";
import Pagination from "../Pagination/pagination";
import { useState, useEffect } from "react";

const RESULT_PAGE = 12;

const Cards = () => {
  const dogsisters = useSelector((state) => state.dogsister.dogsisters);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // Actualiza los elementos cuando cambia la lista completa de dogsisters
    const startIndex = currentPage * RESULT_PAGE;
    const endIndex = startIndex + RESULT_PAGE;
    setItems(dogsisters.slice(startIndex, endIndex));
    const pagesTotal = Math.floor(dogsisters.length / RESULT_PAGE);
    setPages(pagesTotal);
  }, [dogsisters, currentPage]);

  const nextHandler = () => {
    const totalElementos = dogsisters.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * RESULT_PAGE;

    if (firstIndex < totalElementos) {
        setCurrentPage(nextPage);
    }
  };

  const prevHandler = () => {
      if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
      }
  };

  return (
    <ContainerCards>
      <h2>Cuidadores en CABA</h2>
      <div className="cards">
        {items.map((allDogsister) => (
          <Card
          key={allDogsister?.id}
          // image={allDogsister?.photos[0]?.url}
          name={allDogsister?.name}
          city={allDogsister?.city}
          rating={'⭐⭐⭐'}
        />
        ))}
      </div>
      <Pagination pages={pages} currentPage={currentPage} prevHandler={prevHandler} nextHandler={nextHandler} />
    </ContainerCards>
  );
};

export default Cards;

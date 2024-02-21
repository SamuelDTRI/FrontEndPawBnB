import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Order from "../Order/Order";
import { ContainerCards } from "./cards.styled";
import Pagination from "../Pagination/pagination";

const RESULT_PAGE = 12;
const imgDefautl = "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";

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
    const totalElementos = items.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * RESULT_PAGE;

    if (firstIndex >= totalElementos) {
      if(currentPage<=(pages-1)){
        setCurrentPage(nextPage);
      }
    }
  };

  const prevHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ContainerCards>
      <div className="title-order">
        <div className="title"><h2>Cuidadores en CABA</h2></div>
        {items.length>1?
          <Order/>
          :
          <></>
        }
      </div>
      {items.length>0?
        <div className="cards">
          {items.map((allDogsister) => (
            <Card
              key={allDogsister?.id}
              id={allDogsister?.id}
              image={allDogsister?.photoProfile ? allDogsister.photoProfile : imgDefautl}
              name={allDogsister?.name}
              neighborhood={allDogsister?.neighborhood? allDogsister?.neighborhood : 'Desconocido' }
              rating={"⭐⭐⭐"}
              city={allDogsister?.city}
              rates={allDogsister?.rates}
            />
          ))}
        </div>
        :
        <div className="empty">
          <div className="dogSad"><img src='https://www.shutterstock.com/image-vector/sad-sitting-puppy-dog-cartoon-600nw-2181296051.jpg' alt="Perro triste" /></div>
          <h3>Cuidadores no encontrados.</h3>
        </div>
      }
      <Pagination
        pages={pages}
        currentPage={currentPage}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
      />
    </ContainerCards>
  );
};

export default Cards;

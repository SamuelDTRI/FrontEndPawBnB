import { useDispatch, useSelector } from "react-redux";
import CardReview from "../../Components/CardReview/CardReview";
import SitterDescription from "../../Components/SitterDescription/SitterDescription";
import SitterPresentation from "../../Components/SitterPresentation/SitterPresentation";
import SitterRates from "../../Components/SitterRates/SitterRates";
import { sitterInfo, fetchSitter } from "../../redux/sitterSlice";
import Gallery from "../../Components/Gallery/Gallery";
import axios from 'axios';
import style from "./SitterProfile.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SitterProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState([]);
  const imgDefault = "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";
  
  const infoSitter = useSelector((state) => state.sitter);
  const completedProfile = useSelector((state) => state.sitter.completedProfile);
  /* console.log(completedProfile) */
  const noPhotos = !infoSitter.photos || infoSitter.photos.length === 0;

  useEffect(() => {
    const fetchSitterData = async () => {
      try {
        const actionResult = await dispatch(fetchSitter(id));
        
        if (fetchSitter.fulfilled.match(actionResult)) {
          const sitterData = actionResult.payload;
          dispatch(sitterInfo(sitterData));
        } else {
          console.error(
            "Error al obtener la información del cuidador:",
            actionResult.error
          );
        }
      } catch (error) {
        console.error("Error al obtener la información del cuidador:", error);
      }
    };

    const reviewAsync = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/review/${id}`);
        setReview(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    reviewAsync();

    fetchSitterData();
  }, [dispatch, id]);

  return (
    <div className="container col-10 my-5">
      {/* {!completedProfile && <div className={`alert alert-warning ${style.alertYellow}`} role="alert">
        <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
        Completa tu perfil para poder recibir mas reservas. <a href={`/dashboardSitter/${id}`} className="alert-link">Completar perfil</a>. 
      </div>}
        {console.log(completedProfile)} */}

      <section className="container mx-4">
        <SitterPresentation infoSitter={infoSitter} id={id} review={review}/>
      </section>
      {/* {console.log("haciendo prueba de git")} */}
      <section className="container mt-4">
        <h2>Acerca de {infoSitter.name}</h2>
        <SitterDescription infoSitter={infoSitter} />
      </section>
      <section className="container mt-4">
        <h2>Reseñas de {infoSitter.name}</h2>
        {review.length>0?
          <>
            {review.map((allReview) => (
              <CardReview
                key={allReview?.id}
                comment={allReview?.comment}
                rating={allReview?.rating}
                name={allReview?.Owner?.name}
                photo={allReview?.Owner?.photo? allReview?.Owner.photo : imgDefault}
              />
            ))}
            {/* <button className="mt-4">Ver mas Reviews</button> */}
          </>
          :
          <p>No hay reseñas actualmente</p>
        }
        
      </section>
      {noPhotos ? (
      <section className="container mt-4">
        <h2>Agrega fotos en <a href={`/dashboardSitter/${id}`} className={style.link}>Mi Galeria</a>.</h2>
        <Gallery infoSitter={infoSitter} id={id}/>
      </section>) : (<section className="container mt-4">
        <h2>Galeria de {infoSitter.name}</h2>
        <Gallery infoSitter={infoSitter} id={id}/>
      </section>)}

      <section className="col-12">
        <SitterRates infoSitter={infoSitter} />
      </section>
    </div>
  );
};


export default SitterProfile;

import { useDispatch, useSelector } from "react-redux";
import CardReview from "../../Components/CardReview/CardReview";
import SitterDescription from "../../Components/SitterDescription/SitterDescription";
import SitterPresentation from "../../Components/SitterPresentation/SitterPresentation";
import SitterRates from "../../Components/SitterRates/SitterRates";
import { sitterInfo, fetchSitter } from "../../redux/sitterSlice";
import Gallery from "../../Components/Gallery/Gallery";
import style from "./SitterProfile.module.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SitterProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const infoSitter = useSelector((state) => state.sitter);
  const completedProfile = useSelector((state) => state.sitter.completedProfile);
  
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

    fetchSitterData();
  }, [dispatch, id]);

  return (
    <div className="container col-10 my-5">
      {!completedProfile && <div className={`alert alert-warning ${style.alertYellow}`} role="alert">
        <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
        Completa tu perfil para poder recibir mas reservas. <a href={`/dashboardSitter/${id}`} className="alert-link">Completar perfil</a>. 
      </div>}
      <section className="container mx-4">
        <SitterPresentation infoSitter={infoSitter} />
      </section>
      <section className="container mt-4">
        <h2>Acerca de {infoSitter.name}</h2>
        <SitterDescription infoSitter={infoSitter} />
      </section>
      <section className="container mt-4">
        <h2>Reseñas de {infoSitter.name}</h2>
        <CardReview infoSitter={infoSitter} />
        <button className="mt-4">Ver mas Reviews</button>
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

import { useDispatch, useSelector } from "react-redux";
import CardReview from "../../Components/CardReview/CardReview";
import Gallery from "../../Components/Gallery/Gallery";
import SitterDescription from "../../Components/SitterDescription/SitterDescription";
import SitterPresentation from "../../Components/SitterPresentation/SitterPresentation";
import SitterRates from "../../Components/SitterRates/SitterRates";
import { sitterInfo, fetchSitter } from "../../redux/sitterSlice";

import styles from "./SitterProfile.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SitterProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const infoSitter = useSelector((state) => state.sitter);

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
      <section className="container mt-4">
        <h2>Galeria de {infoSitter.name}</h2>
        <Gallery infoSitter={infoSitter} />
      </section>
      <section className="col-12">
        <SitterRates infoSitter={infoSitter} />
      </section>
    </div>
  );
};

export default SitterProfile;

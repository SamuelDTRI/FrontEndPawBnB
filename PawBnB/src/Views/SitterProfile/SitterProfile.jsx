import { useDispatch } from "react-redux";
import CardReview from "../../Components/CardReview/CardReview";
import Gallery from "../../Components/Gallery/Gallery";
import SitterDescription from "../../Components/SitterDescription/SitterDescription";
import SitterPresentation from "../../Components/SitterPresentation/SitterPresentation";
import SitterRates from "../../Components/SitterRates/SitterRates";

import styles from "./SitterProfile.module.css";
import { useEffect } from "react";

const SitterProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div className="container col-10 my-5">
      <section className="container mx-4">
        <SitterPresentation /* sitterDetail={sitterDetail} */ />
      </section>
      <section className="container mt-4">
        <h2>Acerca de Jorge</h2>
        <SitterDescription /* sitterDetail={sitterDetail} */ />
      </section>
      <section className="container mt-4">
        <h2>Reseñas de Jorge</h2>
        <CardReview /* sitterDetail={sitterDetail} */ />
        <button className="mt-4">Ver mas Reviews</button>
      </section>
      <section className="container mt-4">
        <h2>Galeria de Jorge</h2>
        <Gallery /* sitterDetail={sitterDetail} */ />
      </section>
      <section className="container mt-5">
        <div className={styles.mapContainer}>
          <img
            src="https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707536135/PawBnb/scrnli_31_1_2024_23-12-22_ykcnsf.png"
            alt=""
          />
        </div>
      </section>
      <section className="col-12">
        <SitterRates /* sitterDetail={sitterDetail} */ />
      </section>
    </div>
  );
};

export default SitterProfile;

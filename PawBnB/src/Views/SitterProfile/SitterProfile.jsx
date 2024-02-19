import CardReview from "../../Components/CardReview/CardReview";
import Gallery from "../../Components/Gallery/Gallery";
import SitterDescription from "../../Components/SitterDescription/SitterDescription";
import SitterPresentation from "../../Components/SitterPresentation/SitterPresentation";
import SitterRates from "../../Components/SitterRates/SitterRates";

import styles from "./SitterProfile.module.css";

const SitterProfile = () => {
  return (
    <div className="container col-10">
      <section className="container mx-4">
        <SitterPresentation />
      </section>
      <section className="container mt-4">
        <h2>Acerca de Jorge</h2>
        <SitterDescription />
      </section>
      <section className="container mt-4">
        <h2>Reseñas de Jorge</h2>
        <CardReview />
        <CardReview />
        <button className="mt-4">Ver mas Reviews</button>
      </section>
      <section className="container mt-4">
        <h2>Galeria de Jorge</h2>
        <Gallery />
      </section>
      <section className="container mt-5">
        <div className={styles.mapContainer}>
          <h1>Mapa</h1>
        </div>
      </section>
      <section className="col-12">
        <SitterRates />
      </section>
    </div>
  );
};

export default SitterProfile;

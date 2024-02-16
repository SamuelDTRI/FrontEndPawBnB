/* eslint-disable react/prop-types */
import styles from "./SitterPresentation.module.css";

const SitterPresentation = ({ infoSitter }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.imageContainer}>
            <img
              src={infoSitter.photoProfile}
              alt={infoSitter.name}
              className={styles.img}
            />
          </div>
        </div>
        <div className="col">
          <div className="">
            <div className={styles.textContainer}>
              <h3>Hola!</h3>
              <h2>
                Soy <strong>{infoSitter.name}</strong>
              </h2>
              <h3>
                Cuidador en <strong>{infoSitter.neighborhood}</strong>
              </h3>
            </div>
            <div className={styles.reservationContainer}>
              <div className={styles.ratingContainer}>
                <h2>5.0/5.0 ⭐</h2>
                <p>(9 reseñas)</p>
              </div>
              <button>Reserva con {infoSitter.name}</button>
              <h4>
                La reserva no se le cobrara hasta que jorge confirme la reserva
                puede cancelar hasta 48hs antes y obtener un reembolso del 100%
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterPresentation;

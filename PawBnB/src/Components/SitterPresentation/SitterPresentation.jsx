import styles from "./SitterPresentation.module.css";

const SitterPresentation = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.imageContainer}>
            <img
              src="https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330140/enzo-y-yp_ozsk8j.jpg"
              alt="profile pic"
              className={styles.img}
            />
          </div>
        </div>
        <div className="col">
          <div className="">
            <div className={styles.textContainer}>
              <h3>Hola!</h3>
              <h2>
                Soy <strong>JORGE</strong>
              </h2>
              <h3>
                Cuidador en <strong>Palermo</strong>
              </h3>
            </div>
            <div className={styles.reservationContainer}>
              <div className={styles.ratingContainer}>
                <h2>5.0/5.0 ⭐</h2>
                <p>(9 reseñas)</p>
              </div>
              <button>Reserva con Jorge</button>
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

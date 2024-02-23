/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./SitterPresentation.module.css";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp";

const SitterPresentation = ({ infoSitter, review }) => {
  const findPhoto = infoSitter.photoProfile ? infoSitter.photoProfile : NoPhotoProfile;

  const navigate = useNavigate();
  const reservation = () => {
    navigate(`/reservation/${infoSitter.id}`);
  };

  const ratingCount = () => {
    let ratingSum = 0;
    const numDefault = '0.0';
    
    if(review.length > 0){
      
      const ratingArray = review.map((allReview) => {
        return ratingSum += +allReview?.rating;
      });
  
      const ratingAverage = ratingSum / ratingArray.length;

      return ratingAverage.toFixed(1);
    }
    
    return numDefault;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.imageContainer}>
            <img
              src={infoSitter.photoProfile}
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
                Soy <strong>{infoSitter.name}</strong>
              </h2>
              <h3>
                Cuidador en <strong>{infoSitter.neighborhood}</strong>
              </h3>
            </div>
            <div className={styles.reservationContainer}>
              <div className={styles.ratingContainer}>
                <h2>{ratingCount()}/5.0</h2>
                <h2 className={styles.star}><i className="bi bi-star-fill"></i></h2>
                <p>({review.length} reseñas)</p>
              </div>
              <button onClick={reservation}>
                Reserva con {infoSitter.name}
              </button>
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

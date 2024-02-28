import styles from "./CardReview.module.css";

const CardReview = ({comment, rating, name, photo}) => {
  
  const ratingCount = () => {
    const ratingInt = parseInt(rating);
    const ratingArray = []

    for(let i=0; i<ratingInt; i++){
      ratingArray.push(<i key={i} className="bi bi-star-fill"></i>);
    }

    return ratingArray;
  }
  return (
    <div className={styles.cardContainer}>
      <div className={styles.reviewFirstRow}>
        <img
          src={photo}
          alt="Foto de perfil"
        />
        <div className={styles.reviewName}>
          <h2>{name}</h2>
          <h3 className={styles.star}>{ratingCount()}</h3>
        </div>
      </div>
      <div className={styles.reviewText}>
        <p>
          {comment}
        </p>
      </div>
    </div>
  );
};

export default CardReview;

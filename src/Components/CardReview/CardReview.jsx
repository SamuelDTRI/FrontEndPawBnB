import styles from "./CardReview.module.css";

const CardReview = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.reviewFirstRow}>
        <img
          src="https://res.cloudinary.com/dtyqmfqi2/image/upload/t_Profile/v1707330140/enzo-y-yp_ozsk8j.png"
          alt=""
        />
        <div className={styles.reviewName}>
          <h2>Nico</h2>
          <h3>⭐⭐⭐⭐⭐</h3>
        </div>
      </div>
      <div className={styles.reviewText}>
        <p>
          I am also used to mixing up medication and food to make the perfect
          meal for any cat! I currently work in downtown Manhattab during the
          day so I will not be available from roughly 9am-6pm on weekdays to
          care for your cat.
        </p>
      </div>
    </div>
  );
};

export default CardReview;

/* eslint-disable react/prop-types */
import styles from "./SitterDescription.module.css";

const SitterDescription = ({ infoSitter }) => {
  return (
    <div className={styles.description}>
      <p>{infoSitter.description}</p>
    </div>
  );
};

export default SitterDescription;

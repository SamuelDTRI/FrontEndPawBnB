/* eslint-disable react/prop-types */
import styles from "./SitterRates.module.css";

const SitterRates = ({ infoSitter }) => {
  return (
    <div className={`row mt-5 ${styles.ratesContainer}`}>
      <div className="col-12">
        <h3>Precio por dia</h3>
        <h3>${infoSitter.rates}</h3>
      </div>
      <div className="col-12">
        <br />
        <button>RESERVAR AHORA</button>
      </div>
    </div>
  );
};

export default SitterRates;

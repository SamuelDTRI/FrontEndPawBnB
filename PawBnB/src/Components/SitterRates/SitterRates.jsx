import styles from "./SitterRates.module.css";

const SitterRates = () => {
  return (
    <div className={`row mt-5 ${styles.ratesContainer}`}>
      <div className="col-4">
        <h3>Precio por dia</h3>
        <br />
        <h3>$12.000</h3>
      </div>
      <div className="col-4">
        <h3>Tarifas de Jorge</h3>
        <br />
        <button>RESERVAR AHORA</button>
      </div>
      <div className="col-4">
        <h3>Dias festivos</h3>
        <br />
        <h3>+30%</h3>
      </div>
    </div>
  );
};

export default SitterRates;

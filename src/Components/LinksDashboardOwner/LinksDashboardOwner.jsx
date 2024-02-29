/* eslint-disable react/prop-types */
import styles from "./LinksDashboardOwner.module.css";

const LinksDashboardOwner = ({ onClick }) => {
  return (
    <div className={styles.sideBarLinks}>
      <ul className={styles.buttonList}>
        <li>
          <button onClick={() => onClick("miInfo")}>
            <i className="bi bi-person-circle"></i> Mi informacion
          </button>
        </li>
        <li>
          <button onClick={() => onClick("miPerro")}>
            <i className="bi bi-suit-heart"></i> Mi perro
          </button>
        </li>
        <li>
          <button onClick={() => onClick("misReservas")}>
            <i className="bi bi-calendar-week"></i> Mis reservas
          </button>
        </li>
        {/* <li>
          <button onClick={() => onClick("Favoritos")}>
            <i className="bi bi-bookmark-heart"></i> Favoritos
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default LinksDashboardOwner;

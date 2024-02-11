import styles from "./LinksDashboardSitter.module.css";

const LinksDashboardSitter = () => {
  return (
    <div className={styles.sideBarLinks}>
      <ul>
        <li>
          <a href="">
            <i className="bi bi-person-vcard"></i> Mi informacion
          </a>
        </li>
        <li>
          <a href="">
            <i className="bi bi-images"></i> Mi galeria
          </a>
        </li>
        <li>
          <a href="">
            <i className="bi bi-calendar4-week"></i> Mis reservas
          </a>
        </li>
        <li>
          <a href="">
            <i className="bi bi-coin"></i> Pagos
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LinksDashboardSitter;

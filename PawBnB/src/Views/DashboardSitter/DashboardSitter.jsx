import styles from "./DashboardSitter.module.css";

const DashboardSitter = () => {
  return (
    <div className="container ">
      <div className="row">
        <div className={`col-3 ${styles.sideBarContainer}`}>
          <div className={`row ${styles.profilePicContainer}`}>
            <img
              src="https://res.cloudinary.com/dtyqmfqi2/image/upload/t_Profile/v1707405336/Gallery/20230713_100839_ll95yv.png"
              alt="cuidador.name"
            />
          </div>
          <div className="row">
            <h3>Jorge</h3>
          </div>
          <hr />
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
        </div>
        <div className="col-8 ms-5 bg-warning">Form</div>
      </div>
    </div>
  );
};

export default DashboardSitter;

import FormInfoSitter from "../../Components/FormsDashboardSitter/FormInfoSitter";
import LinksDashboardSitter from "../../Components/LinksDashboardSitter/LinksDashboardSitter";
import styles from "./DashboardSitter.module.css";

const DashboardSitter = () => {
  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={`row ${styles.profilePicContainer}`}>
            <img
              src="https://res.cloudinary.com/dtyqmfqi2/image/upload/t_Profile/v1707405336/Gallery/20230713_100839_ll95yv.png"
              alt="cuidador.name"
              className="img-fluid"
            />
          </div>
          <div className="row">
            <h3>Jorge</h3>
          </div>
          <hr />
          <LinksDashboardSitter />
        </div>
        <div
          className={`col-md-8 col-sm-12 ms-3 ms-sm-4 sm-my-3 ${styles.formContainer}`}
        >
          <h2>MI INFORMACION</h2>
          <FormInfoSitter />
        </div>
      </div>
    </div>
  );
};

export default DashboardSitter;

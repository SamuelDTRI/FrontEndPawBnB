import FormInfoSitter from "../../Components/FormsDashboardSitter/FormInfoSitter";
import LinksDashboardSitter from "../../Components/LinksDashboardSitter/LinksDashboardSitter";
import styles from "./DashboardSitter.module.css";
import {useSelector} from "react-redux";
import Gallery from "../../Components/Gallery/Gallery";

const DashboardSitter = () => {

const linkActivo = useSelector((state) => state.dashboard.linkActive);
const infoSitter = useSelector((state) => state.sitter);

console.log(linkActivo)
  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={`row ${styles.profilePicContainer}`}>
            <img
              src={infoSitter.photoProfile}
              alt="cuidador.name"
              className="img-fluid"
            />
          </div>
          <div className="row">
            <h3>{infoSitter.name}</h3>
          </div>
          <hr />
          <LinksDashboardSitter />
        </div>
        <div
          className={`col-md-8 col-sm-12 ms-3 ms-sm-4 sm-my-3 ${styles.formContainer}`}
        >
          {
            linkActivo === "miGaleria"?(<Gallery/>)
           :(<FormInfoSitter/> 
            // <h2>MI INFORMACION</h2>   
           )
          }
          
          
        </div>
      </div>
    </div>
  );
};

export default DashboardSitter;

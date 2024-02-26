import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwnerReservations from "../../Components/OwnerReservations/OwnerReservations"

import LinksDashboardOwner from "../../Components/LinksDashboardOwner/LinksDashboardOwner";
import FormDashboardDueño from "../../Components/FormDashboardDueño/FormDashboardDueño";
import FormAddDog from "../../Components/FormAddDog/FormAddDog";
import OwnerReservations from "../../Components/OwnerReservations/OwnerReservations";

import styles from "./DashboardOwner.module.css";

const DashboardOwner = () => {
  const [activeLink, setActiveLink] = useState("miInfo");
  const [formType, setFormType] = useState("edit");
  const dispatch = useDispatch();

  const ownerInfo = useSelector((state) => state.owner);

  const handleLinkClick = (informacion) => {
    setActiveLink(informacion);

    if (informacion === "miPerro") {
      setFormType("edit");
    } else if (informacion === "Agregar Nuevo") {
      setFormType("new");
    }
  };

  const renderComponent = () => {
    switch (activeLink) {
      case "miInfo":
        return <FormDashboardDueño />;
      case "miPerro":
        return <FormAddDog formType={formType} />;
      case "misReservas":
        return <OwnerReservations/>;
        
      case "Favoritos":
        return {
          /* <Favoritos />; */
        };
      default:
        return null;
    }
  };

  useEffect(() => {}, [dispatch]);

  const lastPhoto =
    ownerInfo.photoProfile && ownerInfo.photoProfile.length > 0
      ? ownerInfo.photoProfile[ownerInfo.photoProfile.length - 1].url
      : "";

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={styles.profilePicContainer}>
            <div className={styles.imageContainer}>
              <img src={lastPhoto} alt={ownerInfo.name} className="img-fluid" />
            </div>
          </div>
          <h3>{ownerInfo.name}</h3>
          <hr />
          <LinksDashboardOwner
            onClick={handleLinkClick}
            activeLink={activeLink}
          />
        </div>

        <div className={`col-md-8 col-sm-12 mx-3 ${styles.formContainer}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardOwner;

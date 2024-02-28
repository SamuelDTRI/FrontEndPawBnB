import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwnerReservations from "../../Components/OwnerReservations/OwnerReservations";
import LinksDashboardOwner from "../../Components/LinksDashboardOwner/LinksDashboardOwner";
import FormDashboardDueño from "../../Components/FormDashboardDueño/FormDashboardDueño";
import FormAddDog from "../../Components/FormAddDog/FormAddDog";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp";
import Swal from "sweetalert2/dist/sweetalert2.js";

import styles from "./DashboardOwner.module.css";
import axios from "axios";
import { infoOwner } from "../../redux/ownerSlice";
import { useParams } from "react-router-dom";

const DashboardOwner = () => {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState("miInfo");
  const [formType, setFormType] = useState("edit");

  const ownerInfo = useSelector((state) => state.owner);

  const dispatch = useDispatch();

  // Cloudinary:
  const [file, setFile] = useState("");
  const [imgProfile, setImgProfile] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // const currentOwner = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `https://backendpawbnb-production.up.railway.app/owners/${id}`
  //     );
  //     dispatch(infoOwner(data));
  //   } catch (error) {
  //     console.error("Error al obtener los datos del cuidador:", error);
  //   }
  // };

  //ESTA FUNCIÓN CONVIERTE LA IMAGEN EN CÓDIGO PARA QUE SE MANDE AL BACK Y EL BACK
  //A CLOUDINARY Y CLOUDINARY TE DEVUELVA UNA URL
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgProfile(reader.result);
    };
    // console.log(imgProfile);
  };

  //LE ENVÍA LA FOTO A LA FUNCIÓN PREVIEWFILES
  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  //LE ENVÍA EL CÓDIGO QUE TE DEVUELVE EL READER PARA ENVIARLO AL BACK
  const handleSubmit = async (event) => {
    if (!imgProfile) {
      Swal.fire({
        title: "Debes seleccionar una imagen.",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
      return;
    }

    try {
      event.preventDefault();
      const result = await axios.put(
        `https://backendpawbnb-production.up.railway.app/owners/${id}`,
        {
          photo: imgProfile,
        }
      );
      console.log(result.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Éxito!",
        text: "Tu imagen se ha subido correctamente!",
        showConfirmButton: false,
        timer: 3000,
      });
      // Actualizar el estado global ownerInfo con la nueva URL de la foto
      dispatch(infoOwner({ ...ownerInfo, photo: result.data.photo }));
    } catch (error) {
      console.log("Error al actualizar la imagen de perfil:", error);
    }
  };

  // useEffect(() => {
  //   currentOwner();
  // }, [dispatch]);

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
        return <OwnerReservations />;

      case "Favoritos":
        return {
          /* <Favoritos />; */
        };
      default:
        return null;
    }
  };

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={styles.profilePicContainer}>
            {activeLink === "miInfo" ? (
              <div className={styles.imgGalleryContainer}>
                <img
                  src={imgProfile || ownerInfo.photo || NoPhotoProfile}
                  alt={ownerInfo.name}
                  className={styles.imageProfile}
                />
                <label htmlFor="fileInput" className={styles.iconImg}>
                  <i className="bi bi-person-bounding-box"></i>
                </label>
                <div>
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <input
                      onChange={(event) => handleChange(event)}
                      name="image"
                      type="file"
                      id="fileInput"
                      required
                      accept="image/png, image/jpeg, image/jpg, image/jfif"
                      style={{ display: "none" }}
                    />
                    <div>
                      <button
                        className={styles.btn}
                        type="button"
                        onClick={(event) => {
                          setIsSubmit(true);
                          handleSubmit(event);
                        }}
                      >
                        ACTUALIZAR FOTO DE PERFIL
                      </button>
                    </div>
                    {/* {uploadSuccess && (
                    <div className={styles.notification}>La imagen se ha subido con éxito</div>
                    )}        */}
                  </form>
                </div>
              </div>
            ) : (
              <div className={styles.noImgProfileContainer}>
                {ownerInfo.photo ? (
                  <img
                    src={ownerInfo.photo}
                    alt={ownerInfo.name}
                    className={styles.imageProfileDos}
                  />
                ) : (
                  <div className={styles.noImgProfileContainer}>
                    <img
                      className={styles.imageProfileDos}
                      src={NoPhotoProfile}
                      alt="No hay foto de perfil"
                    />
                    <p className={styles.textDeNoImg}>
                      Actualiza Tu Foto De Perfil En Mi Informacion
                    </p>
                  </div>
                )}
              </div>
            )}
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

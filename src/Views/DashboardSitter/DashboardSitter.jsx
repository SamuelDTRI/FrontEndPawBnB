import FormInfoSitter from "../../Components/FormsDashboardSitter/FormInfoSitter";
import LinksDashboardSitter from "../../Components/LinksDashboardSitter/LinksDashboardSitter";
import styles from "./DashboardSitter.module.css";
import {useDispatch, useSelector} from "react-redux";
import GallerySitters from "../../Components/GallerySitters/GallerySitters";
import { useEffect, useState } from "react";
import axios from "axios";
import { sitterInfo } from "../../redux/sitterSlice";
import { Link, useParams } from "react-router-dom";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp"
import SitterReservations from "../../Components/SitterReservations/SitterReservations";


const DashboardSitter = () => {
  const [file, setFile] = useState("");
  const [imgProfile, setImgProfile] = useState("");
  const dispatch = useDispatch();
  const {id} = useParams();

  const linkActivo = useSelector((state) => state.dashboard.linkActive);
  const infoSitter = useSelector((state) => state.sitter);
  const [isSubmit, setIsSubmit] = useState(false);
  
  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
      dispatch(sitterInfo(data));
    } catch (error) {
      console.error("Error al obtener los datos del cuidador:", error);
    }
  };

  const previewFiles = (file) => {
    const reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgProfile(reader.result);
    };
    console.log(imgProfile);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (event) => {
    if(!imgProfile) {
      alert("Debes Seleccionar Una Imagen.");
      return;
    }
    event.preventDefault();
    const result = await axios.put(`http://localhost:3000/sitters/${id}`, {
      photoProfile: imgProfile,
    });
    try {
      console.log(result.data);
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [linkActivo]);
  //const lastPhoto = infoSitter.photoProfile && infoSitter.photoProfile.length > 0 ? infoSitter.photoProfile[infoSitter.photoProfile.length - 1].url : '';

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={`row ${styles.profilePicContainer}`}>
            
            {
              linkActivo === "miGaleria"? (
                
              <div className={styles.imageProfileContainer}>

                  {
                    infoSitter.photoProfile ? (
                      <div className={styles.imgGalleryContainer}>
                        <img
                          src={imgProfile || infoSitter.photoProfile}
                          alt={infoSitter.name}
                          className={styles.imageProfile}
                        />
                        <label htmlFor="fileInput" className={styles.iconImg}>
                          <i className="bi bi-person-bounding-box"></i>
                        </label>   
                      </div>
                    ) : (
                      <div className={styles.imgProfileContainer}>
                        <img
                          src={imgProfile || NoPhotoProfile}
                          alt={infoSitter.name}
                          className={styles.imageProfile}
                        />
                        <label htmlFor="fileInput" className={styles.iconImg}>
                          <i className="bi bi-person-bounding-box"></i>
                        </label>    
                      </div>
                  )}

                <div>
                  <form onSubmit={event => handleSubmit(event)}>
                    <input onChange={event => handleChange(event)} name='image' type="file" id='fileInput' required
                    accept='image/png, image/jpeg, image/jpg, image/jfif'  style={{ display: "none" }}/>    
                    <div>
                      <button 
                      className={styles.btn}
                      type="button"
                      onClick={(event) => {
                        setIsSubmit(true);
                        handleSubmit(event)
                      }}
                      >ACTUALIZAR FOTO DE PERFIL</button>
                    </div>        
                  </form>            
                </div>

              </div>) : (
              <div className={styles.noImgProfileContainer}>
                { infoSitter.photoProfile ? (
                  <img
                    src={infoSitter.photoProfile}
                    alt={infoSitter.name}
                    className={styles.imageProfile}
                  />) : (
                    <div className={styles.noImgProfileContainer}>
                      <img className={styles.imageProfile} src={NoPhotoProfile} alt="No hay foto de perfil" />
                      <p className={styles.textDeNoImg}>Actualiza Tu Foto De Perfil En Mi Galeria</p>
                    </div>
                  )
                }
              </div>
              )
            }
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
             linkActivo === "miGaleria"?(<GallerySitters/>)
            :linkActivo === "misReservas"? (<SitterReservations/>) 
            :linkActivo==="miInfo"?(<FormInfoSitter/>)
            :null
            // <h2>MI INFORMACION</h2>  
          }

        </div>
      </div>
    </div>
  );
};

export default DashboardSitter;

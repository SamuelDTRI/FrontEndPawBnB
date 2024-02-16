import FormInfoSitter from "../../Components/FormsDashboardSitter/FormInfoSitter";
import LinksDashboardSitter from "../../Components/LinksDashboardSitter/LinksDashboardSitter";
import styles from "./DashboardSitter.module.css";
import {useDispatch, useSelector} from "react-redux";
import GallerySitters from "../../Components/GallerySitters/GallerySitters";
import { useEffect, useState } from "react";
import axios from "axios";
import { sitterInfo } from "../../redux/sitterSlice";
import { useParams } from "react-router-dom";

const DashboardSitter = () => {
  const [file, setFile] = useState("");
  const [imgProfile, setImgProfile] = useState("");
  const dispatch = useDispatch();
  const {id} = useParams();

  const linkActivo = useSelector((state) => state.dashboard.linkActive);
  const infoSitter = useSelector((state) => state.sitter);

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
    event.preventDefault();
    const result = await axios.put(`http://localhost:3000/sitters/${id}`, {
      photoProfile: imgProfile
    })
    try {
      console.log(result.data);
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch]);

  const lastPhoto = infoSitter.photoProfile && infoSitter.photoProfile.length > 0 ? infoSitter.photoProfile[infoSitter.photoProfile.length - 1].url : '';

  console.log(linkActivo)
  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          <div className={`row ${styles.profilePicContainer}`}>
            
            {
              linkActivo === "miGaleria"? (
              <div className={styles.imageContainer}>
                <img
                  src={imgProfile || lastPhoto}
                  alt="cuidador.name"
                  className="img-fluid"
                />

                <div className={styles.iconImg}>
                  <i className="bi bi-card-image"></i>
                </div>

                <div>
                  <form onSubmit={event => handleSubmit(event)}>
                    <input onChange={event => handleChange(event)} name='image' type="file" id='fileInput' required
                    accept='image/png, image/jpeg, image/jpg, image/jfif' />    
                    <div>
                      <button className={styles.btn}>ACTUALIZAR FOTO DE PERFIL</button>
                    </div>        
                  </form>            
                </div>
              </div>) : (
              <div className={styles.imageContainer}>
                <img
                  src={lastPhoto}
                  alt="cuidador.name"
                  className="img-fluid"
                />
              </div>)
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

import { Formik, Form } from "formik";
import styles from "./GallerySitters.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitterInfo } from "../../redux/sitterSlice"; 
import Swal from 'sweetalert2';

const GallerySitters = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const infoSitter = useSelector((state) => state.sitter);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [imgGallery, setImgGallery] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  
  
  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`https://backendpawbnb-production.up.railway.app/sitters/${id}`);
      dispatch(sitterInfo(data));
    } catch (error) {
      console.error("Error al obtener los datos del cuidador:", error);
    }
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgGallery(reader.result);
    };
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleFormSubmit = async () => {
    if(!imgGallery) {
      Swal.fire({
        title: "Debes seleccionar una imagen.",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
        }
      });
      return;
    }
    try {
      await axios.put(`https://backendpawbnb-production.up.railway.app/sitters/${id}`, {
        photos: imgGallery,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Éxito!",
        text: "Tu imagen se ha subido correctamente!",
        showConfirmButton: false,
        timer: 3000
      });
      setImgGallery(null);
      setUploadSuccess(true);
      currentSitter();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás recuperar esta imagen después.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`https://backendpawbnb-production.up.railway.app/sitters/${id}/photos/${index}`);
          const updatedPhotos = infoSitter.photos.filter((_, i) => i !== index);
          dispatch(sitterInfo({...infoSitter, photos: updatedPhotos }));
          
          Swal.fire({
            title: "Eliminado",
            text: "Tu imagen ha sido eliminada correctamente.",
            icon: "success"
          });
        } catch (error) {
          console.error("Error al eliminar la foto:", error)
        }
        
      } 

    });
  };

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.tituloContainer}>
        <h1 className={styles.titulo}>MI GALERIA</h1>
      </div>

      <div className={styles.formContainer}>
        <div>
         
          {!imgGallery ? (
          <div className={styles.iconContainer}>
            <label htmlFor="fileInputs">
              <i className="bi bi-cloud-upload"></i>
            </label>
            <div className={styles.seleccionUnaImg}>
              <p>SELECCIONA UNA IMAGEN</p>
            </div>
          </div>
          ) : (
            <div className={styles.imgContainer}>
             <img src={imgGallery} alt="Aqui se vera tu imagen" className={styles.imgGallery}/>
             </div>
          )}

          <div className={styles.uploadContainer}>
            <Formik
              initialValues={{
                photos: infoSitter?.photos || [],
              }}
              onSubmit={async (values) => {
                handleFormSubmit(values, dispatch);
              }}
            >
            {() => (
              <Form>
                <input
                className={styles.inputStyle}
                  onChange={handleChange}
                  name="image"
                  type="file"
                  id="fileInputs"
                  required
                  accept="image/png, image/jpeg, image/jpg, image/jfif"
                  style={{ display: "none" }}
                />
                {!imgGallery ? (
                <button 
                type="button" 
                className={styles.btnSubmit} 
                onClick={() => {
                  setIsSubmit(true);
                  handleFormSubmit()
                }}>
                  SUBIR IMAGEN
                </button>
                ) : (
                <>
                <button 
                type="button" 
                className={styles.btnSubmit} 
                onClick={() => {
                  setIsSubmit(true);
                  handleFormSubmit()
                }}>
                  SUBIR IMAGEN
                </button> 

                <button
                className={styles.cancelatBtn}
                onClick={() => {
                  setImgGallery(null);
                  setFile(null);
                }}>
                  CANCELAR
                </button>
                </>
                )}
              </Form>
            )}
            </Formik>
          </div>
        </div>
      </div>

        <div className={styles.gallery}>
          {/* <img src={imgGallery} alt="Aqui se vera tu imagen" /> */}
          {infoSitter.photos?.map((photo, index) => (
            <div key={index} className={styles.photoContainer}>
              <img src={photo.url} alt={`Photo ${index}`} />
              <button
                onClick={() => handleDeletePhoto(index)}
                className={styles.deleteButton}
              >
                X
              </button>
            </div>
        ))}      
      </div>
    </div>
  );
};

export default GallerySitters;

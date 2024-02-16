import { Formik, Form } from "formik";
import styles from "./GallerySitters.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitterInfo } from "../../redux/sitterSlice";

const GallerySitters = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const infoSitter = useSelector((state) => state.sitter);

  const [file, setFile] = useState(null);
  const [imgGallery, setImgGallery] = useState(null);

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
      setImgGallery(reader.result);
    };
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleFormSubmit = async () => {
    const result = await axios.put(`http://localhost:3000/sitters/f1e014dd-db26-4836-9ffc-ea102887b4d9`, {
      photos: imgGallery
    })
    try {
      console.log(result.data);
    } catch(error){
      console.log(error);
    }
  }

  const handleDeletePhoto = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/sitters/f1e014dd-db26-4836-9ffc-ea102887b4d9/photos/${index}`);
      currentSitter(); //actualizamos la galeria despues de la eliminacion
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch]);

  return (
    <div className={styles.galleryContainer}>

      <div className={styles.formContainer}>
        
        <div>

          <div className={styles.uploadImg}>
            <i className="bi bi-cloud-upload"></i>
          </div>
          
          <div>
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
                  onChange={handleChange}
                  name="image"
                  type="file"
                  id="fileInput"
                  required
                  accept="image/png, image/jpeg, image/jpg, image/jfif"
                />
                <button type="submit" className={styles.btn}>
                  SUBIR IMAGENES
                </button>
              </Form>
            )}
            </Formik>
          </div>

        </div>

      </div>

      <div className={styles.imgsRender}>
        <img src={imgGallery} alt="" />

        {infoSitter.photos?.map((photo, index) => (
          <div key={index}>
            <img className={styles.imgs} src={photo.url} alt={`Photo ${index}`} />
            <button onClick={() => handleDeletePhoto(index)}>X</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GallerySitters;


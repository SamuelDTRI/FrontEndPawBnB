import { useEffect, useState } from "react";
import LinksDashboardSitter from "../../Components/LinksDashboardSitter/LinksDashboardSitter";
import styles from "./GallerySitter.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
//! recuerda que tienes que importar el reducer??

const GallerySitters = () => {
    const { id } = useParams();

    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    
    
    const dispatch = useDispatch();
    
    const currentSitter = () => {
      return async () => {
        const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
        dispatch(sitterInfo(data));
      };
    };
    
    useEffect(() => {
      currentSitter();
    }, []);
    
    const sitterInfo = useSelector((state) => state.sitterInfo);
  
  
  //esto servira para que lea la imagen(jpg, pgn, etc) lo conbierna en base 64 para cloudinary y cloudinary devuelva una url
  function previewFiles(file) {
    const reader = new FileReader(); //permite leer los datos enviados desde file
    reader.readAsDataURL(file);//propiedad de FileReader que conbierte el result en una URL para poder ser mostrada en la itnerfaz

        reader.onloadend = () => {
          console.log(image);
          setImage(reader.result); //lo setea con la url conbertida
        }
    }

    const handleChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
      previewFiles(file); //hace que lo muestre en la interfaz
      console.log(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const result = await axios.put(`http://localhost:3001/sitters/8842c3b2-dbb4-42bb-811d-e87bacabd752`, {photos: image})
            console.log(result.data)
        } catch(error){
            console.log(error)
        }
    }
    
  return (
    <div>
      <div className={styles.rosa}>
        <div>
          <h2>MI GALERIA</h2>
        </div>
    
        <div className={styles.subirDocumentos}>
          <i className={`bi bi-cloud-arrow-up ${styles.uploadedImg}`}></i>
          
          <div>
            <form onSubmit={event => handleSubmit(event)}>
                <div>
                    <input type="file" id="fileInput" onChange={event => handleChange(event)} required 
                    accept="image/jpg, image/jpeg, image/jpg image/jfif"/>
                </div>
                <button className={styles.btn}>GUARDAR CAMBIOS</button>
            </form>
            
            <div>
              <img src={image} className="" alt="" />
            </div>
          </div>
    
            <div className={styles.amarillo}>
              <h1>AQUI IRAN LAS IMAGENES</h1>
                    {/* {sitters.photos > 0 ? (
                        <>
                        <img src={sitters.photos?.split(",")} alt={sitters.name} />
                        </>
                    ) : (
                        <h3 className={styles.loading}>Loading...</h3>
                    )} */}
            </div>
      </div>
    </div>
    </div>
  )
};

export default GallerySitters;
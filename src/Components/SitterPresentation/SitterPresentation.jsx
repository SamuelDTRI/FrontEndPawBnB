/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styles from "./SitterPresentation.module.css";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SitterPresentation = ({ infoSitter, review }) => {

  const sitters = useSelector((state)=>state.dogsister.dogsisters)
  const findPhoto = infoSitter.photoProfile ? infoSitter.photoProfile : NoPhotoProfile;

  const getSitterId = ()=>{
    return sitters.filter((sitter)=>sitter.email == infoSitter.email)[0].id
  }
  useEffect(()=>{
    console.log({infoSitter,sitters})
    console.log({encontrado: sitters.filter((sitter)=>sitter.id == infoSitter.id)})
  },[])
  const ratingCount = () => {
    let ratingSum = 0;
    const numDefault = '0.0';
    
    if(review.length > 0){
      
      const ratingArray = review.map((allReview) => {
        return ratingSum += +allReview?.rating;
      });
  
      const ratingAverage = ratingSum / ratingArray.length;

      return ratingAverage.toFixed(1);
    }
    
    return numDefault;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.imageContainer}>
            <img
              src={infoSitter.photoProfile}
              alt="profile pic"
              className={styles.img}
            />
          </div>
        </div>
        <div className="col">
          <div className="">
            <div className={styles.textContainer}>
              <h3>Hola!</h3>
              <h2>
                Soy <strong>{infoSitter.name}</strong>
              </h2>
              <h3>
                Cuidador en <strong>{infoSitter.neighborhood}</strong>
              </h3>
            </div>
            <div className={styles.reservationContainer}>
              <div className={styles.ratingContainer}>
                <h2>{ratingCount()}/5.0</h2>
                <h2 className={styles.star}><i className="bi bi-star-fill"></i></h2>
                <p>({review.length} reseñas)</p>
              </div>
              <Link to = {`/reservation/${getSitterId()}`}>
              <button>
                Reserva con {infoSitter.name}
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterPresentation;

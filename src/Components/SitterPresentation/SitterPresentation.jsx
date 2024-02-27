/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styles from "./SitterPresentation.module.css";
import NoPhotoProfile from "../../Components/imagenes/noPhotoProfile/NoPhotoProfile.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const SitterPresentation = ({ infoSitter }) => {

  const sitters = useSelector((state)=>state.dogsister.dogsisters)
  const findPhoto = infoSitter.photoProfile ? infoSitter.photoProfile : NoPhotoProfile;

  // const getSitterId = ()=>{
  //   //return sitters.filter((sitter)=>sitter.email == infoSitter.email)[0].id
  // }
  useEffect(()=>{
    console.log({infoSitter,sitters})
    console.log({encontrado: sitters.filter((sitter)=>sitter.email == infoSitter.email)[0]})
  },[])
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
                <h2>5.0/5.0 ⭐</h2>
                <p>(9 reseñas)</p>
              </div>
              {/* <Link to = {`/reservation/${getSitterId()}`}>
              <button>
                Reserva con {infoSitter.name}
              </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitterPresentation;

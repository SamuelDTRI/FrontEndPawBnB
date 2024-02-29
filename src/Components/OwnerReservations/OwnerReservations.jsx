import { loadDogsByOwner } from "../../redux/dogsSlice";
import { getReservation } from "../../redux/reservationSlice";
import styles from "./OwnerReservations.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormReview from "../FormReview/FormReview";

const OwnerReservations = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const reservations = useSelector(
    (state) => state.reservation.reservations[0]
  );
  const dogs = useSelector((state) => state.dogs.dogsList);
  const dogSitters = useSelector((state) => state.dogsister.dogsisters);
  
  const [review, setReview] = useState(false);
  const handleReview = () => {
    setReview(true);
  }

  const getfecha = (str) => {
    let date = new Date(str);

    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day}/${month}`;
  };

  const getDog = (id) => {
    const dog = dogs.filter((dog) => dog.id === id)[0];
    return dog ? dog.name : "Dog not found";
  };

  const getSitter = (id) => {
    const sitter = dogSitters.filter((DS) => DS.id === id)[0];
    console.log("SITTERR",sitter)
    return sitter ? sitter.name : "Sitter not found";
  };


  useEffect(() => {
    dispatch(getReservation(userId));
    dispatch(loadDogsByOwner(userId));
    console.log({ reservations, userId });
  }, []);

  return (
    <div className="container">
      <h2>MIS RESERVAS</h2>

      <h5>RESERVAS PENDIENTES</h5>

      <div className="mt-5">
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva) => { 
               
                if (reserva.status == "pendiente") {
                  return (
                    <>
                    <div key={reserva.id}>
                      <div 
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}
                      >
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                    </div>
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>

      <div className="mt-5">
        <h5>RESERVAS ACTIVAS</h5>
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva) => {
                if (reserva.status === "activo") {
                  return (
                    <>
                    <div key={reserva.id}>

                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}
                        >
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                        </div>
                    
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>

      <div className="mt-5">
        <h5>RESERVAS APROBADAS</h5>
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva) => {
                if (reserva.status === "aprobado") {
                  return (
                    <>
                    <div key={reserva.id}>

                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}
                        >
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId).name}/
                          {getDog(reserva.dogId).name}
                        </div>
                      </div>
                        </div>
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>

      <div className="mt-5">
        <h5>RESERVAS COMPLETADAS</h5>
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva) => {
               console.log("RESERVA", reserva)
                if (reserva.status === "completado") {
                  return (
                    <>
                    <div key={reserva.id}>

                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}
                        >
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId).name}/
                          {getDog(reserva.dogId).name}
                        </div>
                      <button onClick={handleReview}>Dejar comentario</button>
                        {review?
                          <FormReview dogSitterId={reserva.dogSitterId} ownerId={reserva.ownerId} reviewState={review}/>                          :
                          <></>
                        }
                        </div>
                        </div>
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>

      <div className="mt-5">
        <h5>RESERVAS CANCELADAS</h5>
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva) => {
                if (reserva.status === "cancelado") {
                  return (
                    <>
                    <div key={reserva.id}>

                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}
                        >
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId).name}/
                          {getDog(reserva.dogId).name}
                        </div>
                      </div>
                        </div>
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default OwnerReservations;

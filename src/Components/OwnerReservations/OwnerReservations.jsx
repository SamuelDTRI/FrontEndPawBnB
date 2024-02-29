import { loadDogsByOwner } from "../../redux/dogsSlice";
import { getReservation } from "../../redux/reservationSlice";
import styles from "./OwnerReservations.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchSitter} from "../../redux/sitterSlice.js"

const OwnerReservations = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const reservations = useSelector(
    (state) => state.reservation.reservations[0]
  );
  const dogs = useSelector((state) => state.dogs.dogsList);
  const [dogSitters, setDogSitters] = useState([])

  useEffect(() => {
    const fetchSitterData = async () => {
      const sittersList = [];
      for (const reserva of reservations) {
        const response = await dispatch(fetchSitter(reserva.dogSitterId));
        if (!response.error) {
          sittersList.push(response.payload); // Suponiendo que el payload contiene los datos del cuidador
        } else {
          // Manejar el error si falla la solicitud
          console.error(
            `Error al obtener datos del cuidador con id ${reserva.dogSitterId}`
          );
        }
      }
      setDogSitters(sittersList);
    };

    if (reservations && reservations.length > 0) {
      fetchSitterData();
    }
  }, [dispatch, reservations]);

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
    // Buscar el cuidador en el estado local sitterData
    const sitter = dogSitters.find((sitter) => sitter.id === id);
    if (sitter) {
      return sitter.name; // Devolver el nombre del cuidador si se encuentra
    } else {
      return "Sitter not found"; // Devolver este mensaje si no se encuentra el cuidador
    }
  };


  useEffect(() => {
    dispatch(getReservation(userId));
    dispatch(loadDogsByOwner(userId));
    console.log({ reservations, userId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h2>MIS RESERVAS</h2>

      <h5>RESERVAS PENDIENTES</h5>

      <div className="mt-5">
        <div className={styles.contReservasActivas}>
          {reservations
            ? reservations.map((reserva, index) => {
                if (reserva.status == "pendiente") {
                  return (
                    <div key={index}>
                      <div
                        key={reserva.id}
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}>
                        <div
                          key={reserva.id}
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div
                          key={reserva.id}
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div
                          key={reserva.id}
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId).name}
                        </div>
                      </div>
                    </div>
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
            ? reservations.map((reserva, index) => {
                if (reserva.status === "activo") {
                  return (
                    <div key={index}>
                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                    </div>
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
            ? reservations.map((reserva,index) => {
                if (reserva.status === "aprobado") {
                  return (
                    <div key={index}>
                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                    </div>
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
            ? reservations.map((reserva, index) => {
                if (reserva.status === "completado") {
                  return (
                    <div key={index}>
                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                    </div>
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
            ? reservations.map((reserva, index) => {
                if (reserva.status === "cancelado") {
                  return (
                    <div key={index}>
                      <div
                        className={`row ${styles.contenedorFechas} ${
                          styles[reserva.status]
                        }`}>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Inicio: {getfecha(reserva.dateCheckIn)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Salida: {getfecha(reserva.dateCheckOut)}
                        </div>
                        <div
                          className={`col-12 col-md-4 ${styles.iFsFC}`}>
                          Cuidador: {getSitter(reserva.dogSitterId)}/
                          {getDog(reserva.dogId)}
                        </div>
                      </div>
                    </div>
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

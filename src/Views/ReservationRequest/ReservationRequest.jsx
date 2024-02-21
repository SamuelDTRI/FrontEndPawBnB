import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./ReservationRequest.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDogsByOwnerId } from "../../redux/ownerSlice";
// import { addReservationStart } from "./../../redux/reservationSlice";
import { ownerSlice } from "../../redux/ownerSlice";
import {
  aceptarReserva,
  rechazarReserva,
  marcarPendiente,
} from "../../redux/reservationSlice";
import { procesarReserva } from "../../Helpers/reservationThunks";

const ReservationRequest = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // const status = useSelector((state) => state.reservation.status);

  //Asi se atrapa el estado del id del usuario
  const userId = useSelector((state) => state.auth.userId);
  const owner = useSelector((state) => state.owner);
  const auth = useSelector((state) => state.auth);
  const dogs = useSelector((state) => state.owner.Dogs.Dogs);

  const getDogs = () => {
    dispatch(fetchDogsByOwnerId(userId));
  };

  useEffect(() => {
    getDogs();
    console.log({ userId, owner, auth, dogs });
  }, [userId]);

  // useEffect(() => {
  //   if (status === "Pendiente") {
  //     // Inicia el temporizador de 24 horas
  //     const tiempoLimite = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
  //     dispatch(procesarReserva(tiempoLimite));
  //   }
  // }, [status, dispatch]);


  return (
    <Formik
      initialValues={{
        dateCheckIn: "",
        dateCheckOut: "",
        entryTime: "",
        reservationFor: "",
        note: "",
      }}
      // validate={(valores) => {
      //   let errores = {};

      //   //Validacion fecha ingreso
      //   const currentDate = new Date();
      //   const checkInDate = new Date(values.dateCheckIn);
      //   if (!valores.dateCheckIn) {
      //     errores.dateCheckIn = "Por favor ingresa una fecha de ingreso.";
      //   } else if (checkInDate <= currentDate) {
      //     errores.dateCheckIn =
      //       "La fecha de ingreso debe ser posterior a la fecha actual.";
      //   }

      //   //Validacion fecha salida
      //   const checkOutDate = new Date(values.dateCheckOut);
      //   if (!valores.dateCheckOut) {
      //     errores.dateCheckOut = "Por favor ingresa un fecha de salida.";
      //   } else if (checkOutDate <= checkInDate) {
      //     errores.dateCheckOut =
      //       "La fecha de salida debe ser posterior a la fecha de ingreso.";
      //   }

      //   //Validacion Horario ingreso
      //   if (!valores.entryTime) {
      //     errores.entryTime = "Por favor ingresa un horario de ingreso.";
      //   }else if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(values.entryTime)) {
      //     errores.entryTime = "Por favor ingresa un horario en formato 24 horas.";
      //   }

      //     //Validacion Reservacion para
      //     if (!valores.reservationFor) {
      //       errores.reservationFor = "Por favor selecciona al menos una mascota.";
      //     }

      //   //Validacion notas

      //   if (!valores.note) {
      //     errores.note = "Por favor ingresa una observacion.";
      //   } else if (valores.note.length > 256) {
      //     errores.note =
      //       "El texto es demasiado largo, por favor ingrese menos de 256 letras";
      //   }

      //   return errores;
      // }}
      onSubmit={(valores, { resetForm }) => {
        //En caso de no seleccionar un perro significa que quiere el primer perro
        valores.reservationFor ? "" : (valores.reservationFor = dogs[0].id);
        console.log({
          valores: valores,
        });
        // dispatch(addReservationStart(valores));
        resetForm();
        console.log("Reserva enviada");
        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(false), 5000);
        if (status === "Pendiente") {
          // Aquí se podría activar la pasarela de pagos si la reserva está aceptada dentro de las 24 horas
          dispatch(aceptarReserva());
        }
      }}
      

    >
      {({ errors }) => (
        //{( {values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
        <Form className={styles.formulario}>
          <h2>SOLICITUD DE RESERVA</h2>
          <br></br>
          <div className={styles.container}>
            <div className={`col-12 ${styles.inputContainer}`}>
              <label htmlFor="dateCheckIn">Fecha de ingreso*</label>
              <Field
                type="date"
                id="dateCheckIn"
                name="dateCheckIn"
              />
              <ErrorMessage
                name="dateCheckIn"
                component={() => (
                  <div className={styles.error}>{errors.dateCheckIn}</div>
                )}
              />
            </div>
            <div className={`col-12 ${styles.inputContainer}`}>
              `<label htmlFor="dateCheckOut">Fecha de salida*</label>
              <Field
                type="date"
                id="dateCheckOut"
                name="dateCheckOut"
                placeholder="Fecha de salida..."
              />
              <ErrorMessage
                name="dateCheckOut"
                component={() => (
                  <div className={styles.error}>{errors.dateCheckOut}</div>
                )}
              />
            </div>
            <div className="col-12">
              <label htmlFor="entryTime">Horario de ingreso</label>
              <Field
                type="time"
                id="entryTime"
                name="entryTime"
                placeholder="Horario de ingreso..."
              />
              <ErrorMessage
                name="entryTime"
                component={() => (
                  <div className={styles.error}>{errors.entryTime}</div>
                )}
              />
            </div>

            <div className="col-12">
              <label htmlFor="reservationFor">Reservacion para</label>
              <Field
                id="reservationFor"
                name="reservationFor"
                as="select"
                className={styles.options}
                key={`${Math.random()}`}
                placeholder="Reservacion para..."
              >
                {dogs
                  ? dogs.map((dog) => {
                      return <option value={dog.id}>{dog.name}</option>;
                    })
                  : ""}
              </Field>
              <ErrorMessage
                name="reservationFor"
                component={() => (
                  <div className={styles.error}>{errors.reservationFor}</div>
                )}
              />

              <div className="col-12">
                <label htmlFor="note">Notas</label>
                <Field
                  type="text area"
                  id="note"
                  name="note"
                  placeholder="Observaciones..."
                />
                <ErrorMessage
                  name="note"
                  component={() => (
                    <div className={styles.error}>{errors.note}</div>
                  )}
                />
              </div>
            </div>
            <br></br>
            <p>
              Una vez enviada la solicitud debes esperar que el cuidador la
              apruebe o la rechaze, en un plazo de 24hs una vez enviada la
              solicitud recibiras una notificacion por mail con el estado de la
              misma. Si esta es aprobada, recibiras un link para realizar el
              pago, luego automaticamente se confirmara la reserva y recibiras
              los datos del cuidador (Direccion, Telefono, etc).
            </p>

            <button type="submit">ENVIAR SOLICITUD</button>
            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con exito!</p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationRequest;

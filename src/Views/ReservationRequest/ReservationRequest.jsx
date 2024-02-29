import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./ReservationRequest.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { loadDogsByOwner } from "../../redux/dogsSlice";
import { sendReservation } from "../../redux/reservationSlice";
import { ownerSlice } from "../../redux/ownerSlice";
import axios from "axios";

const ReservationRequest = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [sitterId, setSitterId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  // const status = useSelector((state) => state.reservation.status);

  //Asi se atrapa el estado del id del usuario
  const userId = useSelector((state) => state.auth.userId);
  const owner = useSelector((state) => state.owner);
  const auth = useSelector((state) => state.auth);
  const dogs = useSelector((state) => state.dogs.dogsList);
  const sitters = useSelector((state) => state.dogsister.dogsisters);
  // const reservations = useSelector((state) => state.reservation.reservations);
  const URL = window.location.href.split("/");
  const getDogs = () => {
    dispatch(loadDogsByOwner(userId));
  };

 console.log("PARA PROBAR")

  const getSitter = () => {
    let dogSitter = sitters.filter((s) => s.id == URL[URL.length - 1])[0];
    return dogSitter.id
  };
  const getSitterRate =()=>{
    let dogSitterRate = sitters.filter((s) => s.id == URL[URL.length - 1])[0];
    console.log("DOGSITTER",dogSitterRate)
    return dogSitterRate.rates
  }

  useEffect(() => {
    // let _sitterId = sitters.filter((sitter) => {
    //   // mapea los sitters
    //   console.log({url:sitter})
    //   return sitter.id
    // });
    console.log({
      sitterUE: sitters,
      idURL: URL[URL.length - 1],
      existSitter: sitters.filter((s) => s.id == URL[URL.length - 1])[0].id,
    });

    // setSitterId(sitters.filter(s=>s.id == URL[URL.length - 1])[0].id);
  }, []);

  useEffect(() => {
    getDogs();
    console.log({ URL });
    console.log({ sitters, userId, owner, auth, dogs, sitterId: getSitter() });
  }, []);

  return (
    <Formik
      initialValues={{
        dateCheckIn: "",
        dateCheckOut: "",
        entryTime: "",
        dogId: "",
        note: "",
        status: "pendiente",
        reviews: "",
        ownerId: userId,
        dogSitterId: `${getSitter()}`,
        rating: "4",
      }}
      validate={(valores) => {
        let errores = {};

        //Validacion fecha ingreso
        const currentDate = new Date();
        const checkInDate = new Date(valores.dateCheckIn);
        if (!valores.dateCheckIn) {
          errores.dateCheckIn = "Por favor ingresa una fecha de ingreso.";
        } else if (checkInDate <= currentDate) {
          errores.dateCheckIn =
            "La fecha de ingreso debe ser posterior a la fecha actual.";
        }

        //Validacion fecha salida
        const checkOutDate = new Date(valores.dateCheckOut);
        if (!valores.dateCheckOut) {
          errores.dateCheckOut = "Por favor ingresa un fecha de salida.";
        } else if (checkOutDate <= checkInDate) {
          errores.dateCheckOut =
            "La fecha de salida debe ser posterior a la fecha de ingreso.";
        }

        //Validacion Horario ingreso
        if (!valores.entryTime) {
          errores.entryTime = "Por favor ingresa un horario de ingreso.";
        }

        //Validacion notas

        if (!valores.note) {
          errores.note = "Por favor ingresa una observacion.";
        } else if (valores.note.length > 256) {
          errores.note =
            "El texto es demasiado largo, por favor ingrese menos de 256 letras";
        }

        return errores;
      }}
      onSubmit={(valores, { resetForm }) => {
        //En caso de no seleccionar un perro significa que quiere el primer perro
        // Después de enviar la reserva
        console.log({ valorOS: valores });
        if (valores.dogId == "") valores.dogId = dogs[0].id;
        dispatch(sendReservation(valores));
        resetForm();
        console.log("Reserva enviada");
        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(false), 5000);

        const handlePayment = async () => {
          try {
            const response = await axios.post(
              "https://backendpawbnb-production.up.railway.app/payment/create-checkout-session",
               { productPrice: getSitterRate() } 
              // Aquí envías el precio del cuidador seleccionado
            );
            const url = response.data.url;
            window.location.href = url;
          } catch (error) {
            console.error("Error al realizar el pago: ", error);
          }
        };

        // Llamamos a la función de pago
         handlePayment();
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
              <Field type="date" id="dateCheckIn" name="dateCheckIn" />
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
              <label htmlFor="dogId">Reservacion para</label>
              <Field
                id="dogId"
                name="dogId"
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
                name="dogId"
                component={() => (
                  <div className={styles.error}>{errors.dogId}</div>
                )}
              />
              <div className="col-12">
                <label htmlFor="note">Notas</label>
                <Field
                  type="textarea"
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

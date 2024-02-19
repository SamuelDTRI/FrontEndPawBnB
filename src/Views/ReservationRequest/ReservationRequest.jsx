import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./ReservationRequest.module.css"
import { useNavigate, useLocation } from "react-router-dom";
//import { addReservationStart } from "./../../redux/reservationSlice";


const ReservationRequest = () => {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;
  
    return (
      
        <Formik
          initialValues={{
            dateCheckIn: "",
            dateCheckOut: "",
            entryTime: "",
            reservationFor: "",
            note: "",
            
          }}
          
          validate={(valores) => {
            
            let errores = {};
            //Validacion fecha ingreso
            if (!valores.dateCheckIn) {
              errores.dateCheckIn = "Por favor ingresa una fecha de ingreso.";
            } else if ((fechaIngresada < fechaActual).test(valores.dateCheckIn)) {
              errores.dateCheckIn = "La fecha de ingreso debe ser posterior a la fecha actual.";
            }
            //Validacion Apellido
            /*if (!valores.surName) {
              errores.surName = "Por favor ingresa un apellido.";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.surName)) {
              errores.surName = "Ingresa solo letras y no más de 20 caracteres.";
            }
  
            //Validacion Mail
            if (!valores.email) {
              errores.email = "Por favor ingresa un mail.";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.email
              )
            ) {
              errores.email =
                "El email solo puede contener letras, numeros, puntos, guiones, y guion bajo";
            }
  
            //Validacion phone
             if (!valores.phone) {
               errores.phone = "Por favor ingresa un phone.";
             } else if (!/^\d{10}$/.test(valores.phone)) {
               errores.phone = "Ingresa solo numeros y no más de 10 caracteres.";
             }*/
        
            
  
            
  
             return errores;
             
            }
            
        }
          
          
          onSubmit={(valores, { resetForm }) => {
            dispatch(addReservationStart(valores));
            resetForm();
            console.log("Reserva enviada");
            cambiarFormularioEnviado(true);
            setTimeout(() => cambiarFormularioEnviado(false), 5000);

            
          }}>
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
                      placeholder="Fecha de ingreso..."
                    />
                    <ErrorMessage
                      name="dateCheckIn"
                      component={() => (
                        <div className={styles.error}>{errors.dateCheckIn}</div>
                      )}
                    />
                  </div>
                  <div className={`col-12 ${styles.inputContainer}`}>`
                    <label htmlFor="dateCheckOut">Fecha de salida*</label>
                    <Field
                      type="date"
                      id="dateCheckOut"
                      name="dateCheckOut"
                      placeholder="Fecha de salida..."
                    />
                    <ErrorMessage
                      name="dateCheckOut"
                      component={() => (
                        <div className={styles.error}>{errors.dateCheckOut }</div>
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
                      type="reservationFor"
                      placeholder="Reservacion para..."
                    />
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
               <p>Una vez enviada la solicitud debes esperar que el cuidador la apruebe o la rechaze,
                 en un plazo de 24hs una vez enviada la solicitud recibiras una notificacion por mail
                con el estado de la misma. Si esta es aprobada, recibiras un link para realizar el 
                 pago, luego automaticamente se confirmara la reserva y recibiras los datos del cuidador (Direccion, Telefono, etc).</p>
                              
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
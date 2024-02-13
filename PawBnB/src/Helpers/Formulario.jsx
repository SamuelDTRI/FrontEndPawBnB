/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Formulario.module.css";
import { Barrios } from "./Barrios";
import { signUpOwner } from "../redux/signUpSlice";
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import checkRegistration from "../utils/checkRegistration.js";
import { loginUser } from "../redux/authSlice.js";


const Formulario = (text, role) => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;
    // Traer los datos del store de Redux
  const { googleSignIn, googleUser } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (googleUser) {
      const fetchUserData = async () => {
        try {
          // Esperar a que el estado user se actualice y luego obtener el correo electrónico del usuario
          const email = googleUser.providerData[0].email;
          // Verificar si el usuario ya está registrado
          const { exist, checkId, checkRole } = await checkRegistration(email);
          // Si el usuario no está registrado, redirigir al formulario de registro
          if (!exist) {
            if (currentPath === "/SignUpSitters"){
              navigate({
                pathname: "/SignUpSitters",
                search: createSearchParams({
                  email: `${email}`,
                }).toString(),
              });
            } else {
              navigate({
                pathname: "/SignUp",
                search: createSearchParams({
                  email: `${email}`,
                }).toString(),
              });
            }
              
          } else {
            // cambiamos el estado global para completar el logueo
            dispatch(loginUser({ userId: checkId, userRole: checkRole }));
          }
        } catch (error) {
          console.error(
            "Error al obtener el correo electrónico del usuario:",
            error
          );
        }
      };
      fetchUserData()
    }
  }, [googleUser, navigate,dispatch, currentPath]);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          surName: "",
          email: "",
          phone: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};
          //Validacion name
          if (!valores.name) {
            errores.name = "Por favor ingresa un name.";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.name)) {
            errores.name = "Ingresa solo letras y no más de 20 caracteres.";
          }
          //Validacion Apellido
          if (!valores.surName) {
            errores.surName = "Por favor ingresa un surName.";
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
          // if (!valores.phone) {
          //   errores.phone = "Por favor ingresa un phone.";
          // } else if (!/^\d{10}$/.test(valores.phone)) {
          //   errores.phone = "Ingresa solo numeros y no más de 10 caracteres.";
          // }
          // Validación password (Expresion regular)
          if (!valores.password) {
            errores.password = "Por favor ingresa una password.";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              valores.password
            )
          ) {
            errores.password =
              "La password debe contener al menos 8 caracteres, Minúsculas, Mayúsculas y al menos un caracter especial.";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          dispatch(
            signUpOwner(valores, text.role, navigate("/Login"))
          );

          resetForm();
          console.log("Se enviaron los datos");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}>
        {({ errors }) => (
          //{( {values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form className={styles.formulario}>
            <h2>{text.text}</h2>
            <div className={styles.container}>
              <div className="">
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="name">Nombre*</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tu primer Nombre..."
                  />
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <div className={styles.error}>{errors.name}</div>
                    )}
                  />
                </div>
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="surName">Apellido*</label>
                  <Field
                    type="text"
                    id="surName"
                    name="surName"
                    placeholder="Tu Apellido..."
                  />
                  <ErrorMessage
                    name="surName"
                    component={() => (
                      <div className={styles.error}>{errors.surName}</div>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="email">Email*</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className={styles.error}>{errors.email}</div>
                    )}
                  />
                </div>
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="phone">Telefono*</label>
                  <Field
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Tu telefono..."
                  />
                  <ErrorMessage
                    name="phone"
                    component={() => (
                      <div className={styles.error}>{errors.phone}</div>
                    )}
                  />
                </div>
              </div>
              <div className="">
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="password">Contraseña*</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Tu Contraseña..."
                  />
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className={styles.error}>{errors.password}</div>
                    )}
                  />
                </div>
              </div>

              <button type="submit">REGISTRARSE</button>
              {formularioEnviado && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {!googleUser && (<GoogleButton
        className="googleButton"
        label="Regístrate con Google"
        onClick={handleGoogleSignIn}
      />)}
    </>
  );
};

export default Formulario;

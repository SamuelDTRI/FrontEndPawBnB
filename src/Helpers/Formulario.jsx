/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import styles from "./Formulario.module.css";
import { Barrios } from "./Barrios";
import { signUpOwner } from "../redux/signUpSlice";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import checkRegistration from "../utils/checkRegistration.js";
import { googleLoginSuccess } from "../redux/authSlice.js";
import DogSignUp from "../Components/imagenes/DogSignUp/DogSignUp.png";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/, 'La contraseña debe contener al menos 8 caracteres, Minúsculas, Mayúsculas y al menos un caracter especial.')
    .required('Por favor ingresa una contraseña'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Es necesario repetir la contraseña'),
});


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
    if (googleUser && googleUser.providerData) {
      // console.log(googleUser)
      const fetchUserData = async () => {
        try {
          // Esperar a que el estado user se actualice y luego obtener el correo electrónico del usuario
          const email = googleUser.providerData[0].email;
          // Verificar si el usuario ya está registrado
          const { exist, checkId, checkRole, checkDeleted } = (await checkRegistration(email)) || {};
          // Si el usuario no está registrado, redirigir al formulario de registro
          if (!exist) {
            if (currentPath == "/SignUpSitters") {
              const { userId, userRole } = await dispatch(
                signUpOwner({ email: email }, "DogSitter")
              );
              if (userRole) {
                const { checkId, checkRole, checkDeleted } = (await checkRegistration(email)) || {};
                dispatch(
                  googleLoginSuccess({
                    userId: checkId,
                    userRole: checkRole,
                    userDeleted: checkDeleted,
                  })
                );
                navigate(`/dashboardSitter/${userId}`);
              }
            } else {
              const { userId, userRole } = await dispatch(
                signUpOwner({ email: email }, "Owner")
              );
              if (userRole) {
                const { checkId, checkRole, checkDeleted } = (await checkRegistration(email)) || {};
                dispatch(
                  googleLoginSuccess({
                    userId: checkId,
                    userRole: checkRole,
                    userDeleted: checkDeleted,
                  })
                );
                navigate(`/Home`);
              }
            }
          } else {
            // cambiamos el estado global para completar el logueo
            googleLoginSuccess({ userId: checkId, userRole: checkRole });
            if (checkRole === "Owner") {
              navigate(`/Home`);
            } else if (checkRole === "DogSitter") {
              navigate(`/dashboardSitter/${checkId}`);
            }
          }
        } catch (error) {
          console.error(
            "Error al obtener el correo electrónico del usuario:",
            error
          );
        }
      };
      fetchUserData();
    }
  }, [googleUser, navigate, dispatch, currentPath]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "auth/loginFailure", payload: null });
    }, 8000);
    return () => clearTimeout(timeoutId);
  }, [formularioEnviado, dispatch]);

  return (
    <Formik
      initialValues={{
        name: "",
        surName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      }}
      validate={(valores) => {
        let errores = {};
        //Validacion name
        if (!valores.name) {
          errores.name = "Por favor ingresa un nombre.";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.name)) {
          errores.name = "Ingresa solo letras y no más de 20 caracteres.";
        }
        //Validacion Apellido
        if (!valores.surName) {
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
        }
        // Validación password (Expresion regular)
        // if (!valores.password) {
        //   errores.password = "Por favor ingresa una contraseña.";
        // } else if (
        //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/.test(
        //     valores.password
        //   )
        // ) {
        //   errores.password =
        //     "La contraseña debe contener al menos 8 caracteres, Minúsculas, Mayúsculas y al menos un caracter especial.";
        // }
        //Validacion de ambas contraseñas

        return errores;
      }}
      validationSchema={SignupSchema}
      onSubmit={async (valores, { resetForm }) => {
        const { userRole } = dispatch(
          signUpOwner(valores, text.role, navigate("/Login"))
        );
        if (userRole) navigate("/Login");
        resetForm();
        console.log("Se enviaron los datos");
        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(false), 5000);
      }}>
      {({ errors }) => (
        //{( {values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
        <Form className={styles.formulario}>
          <h2>{text.text}</h2>
          <div className={styles.googleButton}>
            {!googleUser && (
              <GoogleButton
                className="googleButton"
                label="Regístrate con Google"
                onClick={handleGoogleSignIn}
              />
            )}
          </div>
          <div className={styles.container}>
            <div className={`col-12 ${styles.inputContainer}`}>
              
              <label htmlFor="name">
                <span>Nombre*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Tu primer Nombre..."
              />
              <div className={styles.errorInputContainer}>
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="surName">
                <span>Apellido*</span>
              </label>
              <Field
                type="text"
                id="surName"
                name="surName"
                placeholder="Tu Apellido..."
              />
              <div className={styles.errorInputContainer}>
                <ErrorMessage
                  name="surName"
                  component={() => (
                    <div className={styles.error}>{errors.surName}</div>
                  )}
                />
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="email">
                <span>Email*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
              />
              <div className={styles.errorInputContainer}>
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                />
              </div>
              <div className="col-12">
                <label htmlFor="phone">
                  <span>Teléfono*</span>
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Tu teléfono..."
                />
                <div className={styles.errorInputContainer}>
                  <ErrorMessage
                    name="phone"
                    component={() => (
                      <div className={styles.error}>{errors.phone}</div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="password">
                <span>Contraseña*</span>
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Tu Contraseña..."
              />
              <div className={styles.errorInputContainer}>
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="confirmPassword">
                <span>Repetir Contraseña*</span>
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Tu Contraseña..."
              />
              <div className={styles.errorInputContainer}>
                <ErrorMessage
                  name="confirmPassword"
                  component={() => (
                    <div className={styles.error}>{errors.confirmPassword}</div>
                  )}
                />
              </div>
            </div>
            <button type="submit">REGISTRARSE</button>
            <div className={styles.submitMessage}>
              {formularioEnviado && (
                <p className={styles.exito}>Formulario enviado con exito!</p>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};


export default Formulario;

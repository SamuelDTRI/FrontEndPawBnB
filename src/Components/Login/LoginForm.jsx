/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser, googleLoginSuccess } from "../../redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { UserAuth } from "../../context/AuthContext.jsx";
import GoogleButton from "react-google-button";
import checkRegistration from "../../utils/checkRegistration.js";
import { signUpOwner } from "../../redux/signUpSlice.js";


const LoginForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn, googleUser} = UserAuth();
  const error = useSelector((state) => state.auth.error);
  // eslint-disable-next-line no-unused-vars
  const userRole = useSelector((state)=> state.auth.userRole);
  // eslint-disable-next-line no-unused-vars
  const userId = useSelector((state) => state.auth.userId);

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch(error) {
      console.log(error);
    }
  };
  useEffect(()=> {
    if (googleUser && googleUser.reloadUserInfo) {
      const email = googleUser.reloadUserInfo.email;
      const fetchUserData = async () => {
        try {
          // Esperar a que el estado user se actualice y luego obtener el correo electrónico del usuario
          // Verificar si el usuario ya está registrado
          const { exist, checkId, checkRole, checkDeleted } = (await checkRegistration(email)) || {};
          // Si el usuario no está registrado, redirigir al formulario de registro
          if (!exist) {
            const { userRole } = (await dispatch(signUpOwner({ email: email }, "Owner"))) || {};
            
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
          } else {
            // cambiamos el estado global para completar el logueo
            dispatch(
              googleLoginSuccess({ userId: checkId, userRole: checkRole, userDeleted: checkDeleted })
            );
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
  }, [googleUser, navigate,dispatch]);

  const handleSubmit = async (formData) => {
    const { userId, userRole } = (await dispatch(loginUser(formData))) || {};
    if (userRole === "Owner") {
      navigate(`/Home`);
    } else if (userRole === "DogSitter") {
      navigate(`/dashboardSitter/${userId}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "auth/loginFailure", payload: null });
    }, 8000);
    return () => clearTimeout(timeoutId);
  }, [error, dispatch]);

  // useEffect(() => {
  //   // Redireccionamos al usuario después de un inicio de sesión exitoso
  //   if (userRole === "Owner") {
  //     navigate(`/Home/${userId}`); // Redirige al dashboard del cliente en base a la Id
  //   } else if (userRole === "DogSitter") {
  //     navigate(`/dashboardSitter/${userId}`); // Redirige al dashboard del cuidador en base a la Id
  //   }
  // }, [userRole, userId, navigate]);
  
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};
          //Validación Mail
          if (!valores.email) {
            errores.email = "Por favor ingresa un mail.";
          }
          // Validación Contraseña (Expresión regular)
          if (!valores.password) {
            errores.password = "Por favor ingresa una contraseña.";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          handleSubmit(valores);
          resetForm();
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}>
        {({ errors }) => (
          //{( {values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form className={styles.formulario}>
            <h2>INGRESAR</h2>
            <div className={styles.googleButton}>
              <GoogleButton
                className="googleButton"
                label="Iniciar sesión con Google"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div className={styles.container}>
              <div>
                <label htmlFor="correo" className={styles.label}>
                  <span>Email</span>
                </label>
                <Field
                  type="email"
                  id="correo"
                  name="email"
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
              </div>
              <div>
                <label htmlFor="contraseña">
                  <span>Contraseña</span>
                </label>
                <Field
                  type="password"
                  id="contraseña"
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
              <button type="submit">Iniciar Sesión</button>
              {/* {formularioEnviado && (
                <p className={styles.exito}>Formulario enviado con éxito!</p>
              )} */}
              <div className={styles.errorContainer}>
                {error && <p className={styles.error}>{error}</p>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

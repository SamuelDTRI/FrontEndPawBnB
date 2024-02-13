/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser } from "../../redux/authSlice.js";
import { createSearchParams, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { UserAuth } from "../../context/AuthContext.jsx";
import GoogleButton from "react-google-button";
import checkRegistration from "../../utils/checkRegistration.js";


const LoginForm = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);

  const { googleSignIn, googleUser} = UserAuth();

  const handleSubmit = async (formData) => {
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: "auth/loginFailure", payload: null });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [error, dispatch]);
  useEffect(() => {
    // Redireccionamos al usuario después de un inicio de sesión exitoso
    if (userRole === "Owner") {
      navigate(`/Home`);// Redirige al dashboard del cliente en base a la Id
    } else if (userRole === "DogSitter") {
      navigate(`/dashboardSitter/${userId}`); // Redirige al dashboard del cuidador en base a la Id
    }
  }, [userRole, userId, navigate]);

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch(error) {
      console.log(error);
    }
  };
  useEffect(()=> {
    if (googleUser) {
      const fetchUserData = async () => {
        try {
          // Esperar a que el estado user se actualice y luego obtener el correo electrónico del usuario
          const email = googleUser.providerData[0].email;
          // Verificar si el usuario ya está registrado
          const { exist, checkId, checkRole } = await checkRegistration(email);
          // Si el usuario no está registrado, redirigir al formulario de registro
          if (!exist) {
            navigate({
              pathname: "/SignUp",
              search: createSearchParams({
                email: `${email}`
              }).toString()
            });
          } else {
            console.log(checkId, checkRole)
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
  }, [googleUser, navigate]);
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
            <div>
              <label htmlFor="correo">Email</label>
              <Field
                type="email"
                id="correo"
                name="email"
                placeholder="example@gmail.com"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className={styles.error}>{errors.email}</div>
                )}
              />
            </div>
            <div>
              <label htmlFor="contraseña">Contraseña</label>
              <Field
                type="password"
                id="contraseña"
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
            <button type="submit">Iniciar Sesión</button>
            {formularioEnviado && (
              <p className={styles.exito}>Formulario enviado con éxito!</p>
            )}
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
      <br/>
      <GoogleButton
        className="googleButton"
        label="Inicia sesión con Google"
        onClick={handleGoogleSignIn}
      />
    </div>
  );
};

export default LoginForm;

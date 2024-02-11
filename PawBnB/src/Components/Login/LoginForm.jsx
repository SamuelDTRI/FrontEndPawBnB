import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser } from "../../redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);

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
      // navigate(`/owner-dashboard/${userId}`);// Redirige al dashboard del cliente en base a la Id
    } else if (userRole === "DogSitter") {
      navigate(`/dashboardSitter/${userId}`); // Redirige al dashboard del cuidador en base a la Id
    }
  }, [userRole, userId, navigate]);
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
          console.log("Se enviaron los datos");
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
    </div>
  );
};

export default LoginForm;

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import { loginAdmin } from "../../../redux/adminUsersSlice";

const AdminLogin = () => {
    // eslint-disable-next-line no-unused-vars
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.adminUsers.error);
    
    const handleSubmit = async (formData) => {
        const { userRole } = (await dispatch(loginAdmin(formData))) || {};
        console.log(userRole)
        if(userRole){
            navigate(`/dashboardAdmin`);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch({ type: "adminUsers/adminLoginFailure", payload: null });
        }, 8000);
        return () => clearTimeout(timeoutId);
    }, [error, dispatch]);

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
                        <div className={styles.container}>
                            <h2>LOG IN</h2>
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

export default AdminLogin;

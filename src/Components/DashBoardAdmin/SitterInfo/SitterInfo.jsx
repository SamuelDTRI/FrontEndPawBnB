import { Barrios } from "../../../Helpers/Barrios.js";
import { Cities } from "../../../Helpers/Cities.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./SitterInfo.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const SitterInfo = ({ userInfo, editDisable, handleFormSubmit }) => {
    const [formSent, setFormSent] = useState(false);
    const dispatch = useDispatch();

    return (
        <Formik
        initialValues={{
            name: userInfo?.name || "",
            surName: userInfo?.surName || "",
            email: userInfo?.email || "",
            password: userInfo?.password || "",
            phone: userInfo?.phone || "",
            dateOfBirth: userInfo?.dateOfBirth || "",
            rates: userInfo?.rates || "",
            city: userInfo?.city || "",
            neighborhood: userInfo?.neighborhood || "",
            address: userInfo?.address || "",
            description: userInfo?.description || "",
        }}
        // eslint-disable-next-line no-unused-vars
        validate={(values) => {
            let errors = {};

            return errors;
        }}
        onSubmit={(values, { resetForm }) => {
            handleFormSubmit(values, dispatch, resetForm, setFormSent);
        }}>
        {({ errors }) => (
            <Form className={`container ${styles.form}`}>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="name">Nombre</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            disabled={editDisable}
                            placeholder={userInfo?.name}
                        />
                        <ErrorMessage
                            name="name"
                            component={() => (
                            <div className={styles.error}>{errors.name}</div>
                            )}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="surName">Apellido</label>
                        <Field
                            type="text"
                            id="surName"
                            name="surName"
                            disabled={editDisable}
                            placeholder={userInfo?.surName}
                        />
                        <ErrorMessage
                            name="surName"
                            component={() => (
                            <div className={styles.error}>{errors.surName}</div>
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            disabled={editDisable}
                            placeholder={userInfo?.email}
                        />
                        <ErrorMessage
                            name="email"
                            component={() => (
                            <div className={styles.error}>{errors.email}</div>
                            )}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="phone">Telefono</label>
                        <Field
                            type="number"
                            id="phone"
                            name="phone"
                            disabled={editDisable}
                            placeholder={userInfo?.phone}
                        />
                        <ErrorMessage
                            name="phone"
                            component={() => (
                            <div className={styles.error}>{errors.phone}</div>
                            )}
                        />
                    </div>
                </div>
                {/* <div className="col-12">
                    <label htmlFor="password">Contraseña</label>
                        <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder={userInfo?.password}
                        />
                        <ErrorMessage
                        name="password"
                        component={() => (
                            <div className={styles.error}>{errors.password}</div>
                        )}
                        />
                </div> */}
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                        <Field
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            disabled={editDisable}
                            placeholder={userInfo?.dateOfBirth}
                        />
                        <ErrorMessage
                            name="dateOfBirth"
                            component={() => (
                            <div className={styles.error}>{errors.dateOfBirth}</div>
                            )}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="rates">Tarifa por dia</label>
                        <Field
                            type="text"
                            id="rates"
                            name="rates"
                            disabled={editDisable}
                            placeholder={userInfo?.rates}
                        />
                        <ErrorMessage
                            name="rates"
                            component={() => (
                            <div className={styles.error}>{errors.rates}</div>
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="city">Ciudad</label>
                        <Field name="city" as="select" disabled={editDisable}>
                            {Cities?.map((city) => {
                            return (
                                <option key={city} value={city}>
                                {city}
                                </option>
                            );
                            })}
                        </Field>
                        <ErrorMessage
                            name="city"
                            component={() => (
                            <div className={styles.error}>{errors.city}</div>
                            )}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <label htmlFor="neighborhood">Barrio</label>
                        <Field name="neighborhood" as="select" disabled={editDisable}>
                            <option disabled value="">
                            {userInfo.neighborhood
                                ? userInfo.neighborhood
                                : "Selecciona tu barrio"}
                            </option>
                            {Barrios?.map((barrio) => {
                            return (
                                <option key={barrio} value={barrio}>
                                {barrio}
                                </option>
                            );
                            })}
                        </Field>
                        <ErrorMessage
                            name="neighborhood"
                            component={() => (
                            <div className={styles.error}>{errors.neighborhood}</div>
                            )}
                        />
                    </div>
                </div>
                <div className="">
                        <label htmlFor="address">Direccion</label>
                        <Field
                            type="text"
                            id="address"
                            name="address"
                            disabled={editDisable}
                            placeholder={userInfo?.address}
                        />
                        <ErrorMessage
                            name="address"
                            component={() => (
                                <div className={styles.error}>{errors.address}</div>
                            )}
                        />
                </div>
                <div className="">
                    <label htmlFor="description">Descripción</label>
                    <Field
                        type="text"
                        id="description"
                        name="description"
                        disabled={editDisable}
                        placeholder={userInfo?.description}
                    />
                    <ErrorMessage
                        name="description"
                        component={() => (
                            <div className={styles.error}>{errors.description}</div>
                        )}
                    />
                </div>
                <button
                    type="submit"
                    disabled={editDisable}
                    style={
                    editDisable
                        ? { backgroundColor: " #7582a1" }
                        : { backgroundColor: " #ffa319" }
                    }>
                    GUARDAR CAMBIOS
                </button>
                {formSent && (
                    <p className={styles.success}>Cambios guardados con exito!</p>
                )}
            </Form>
        )}
        </Formik>
    );
};

SitterInfo.propTypes = {
    userInfo: PropTypes.object.isRequired,
    editDisable: PropTypes.bool,
    handleFormSubmit: PropTypes.func.isRequired,
};
export default SitterInfo;
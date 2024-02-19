import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { sitterInfo, updateSitter } from "../../redux/sitterSlice";
import { Cities } from "../../Helpers/Cities";
import { Barrios } from "../../Helpers/Barrios";

import axios from "axios";
import styles from "./FormInfoSitter.module.css";

const FormInfoSitter = () => {
  const [formSent, setFormSent] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const infoSitter = useSelector((state) => state.sitter);

  const dispatch = useDispatch();
  const { id } = useParams();

  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
      dispatch(sitterInfo(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = async (values, dispatch, resetForm, setFormSent) => {
    try {
      const {
        name,
        surName,
        email,
        password,
        phone,
        dateOfBirth,
        rates,
        city,
        neighborhood,
        address,
        description,
      } = values;
      await dispatch(
        updateSitter({
          id: id,
          updatedSitter: {
            name,
            surName,
            email,
            password,
            phone,
            dateOfBirth,
            rates,
            city,
            neighborhood,
            address,
            description,
          },
        })
      );
      await currentSitter();
      resetForm();
      setFormSent(true);
      setForceUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch, forceUpdate]);

  return (
    <>
      <Formik
        initialValues={{
          name: infoSitter?.name || "",
          surName: infoSitter?.surName || "",
          email: infoSitter?.email || "",
          password: infoSitter?.password || "",
          phone: infoSitter?.phone || "",
          dateOfBirth: infoSitter?.dateOfBirth || "",
          rates: infoSitter?.rates || "",
          city: infoSitter?.city || "",
          neighborhood: infoSitter?.neighborhood || "",
          address: infoSitter?.address || "",
          description: infoSitter?.description || "",
        }}
        validate={(values) => {
          let errors = {};
          /*   if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
            errors.name = "Ingresa solo letras y no más de 20 caracteres.";
          }
          if (!values.surName) {
            errors.surName = "Por favor ingresa un apellido.";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.surName)) {
            errors.surName = "Ingresa solo letras y no más de 20 caracteres.";
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Por favor ingresa tu fecha de nacimiento.";
          }
          if (!values.rates) {
            errors.rates = "Por favor ingresa tu tarifa por día.";
          } else if (!/^\d+(\.\d{1,2})?$/.test(values.rates)) {
            errors.rates = "Ingresa una tarifa válida.";
          }
          if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email =
              "El correo solo puede contener letras, numeros, puntos, guiones, y guion bajo";
          }
          if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = "Ingresa solo numeros y no más de 10 caracteres.";
          }

          if (!values.neighborhood) {
            errors.neighborhood = "Por favor ingresa un Barrio.";
          }
          if (!values.city) {
            errors.city = "Por favor ingresa una ciudad.";
          }
          if (!values.address) {
            errors.address = "Por favor ingresa una direccion.";
          }
          if (!values.description) {
            errors.description = "Por favor ingresa una descripcion.";
          } */

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, dispatch, resetForm, setFormSent);
        }}
      >
        {({ errors }) => (
          <Form className={`container ${styles.form}`}>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="name">Nombre</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder={infoSitter?.name}
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
                  placeholder={infoSitter?.surName}
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
                  placeholder={infoSitter?.email}
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="password">Contraseña</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder={infoSitter?.password}
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="phone">Telefono</label>
              <Field
                type="number"
                id="phone"
                name="phone"
                placeholder={infoSitter?.phone}
              />
              <ErrorMessage
                name="phone"
                component={() => (
                  <div className={styles.error}>{errors.phone}</div>
                )}
              />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder={infoSitter?.dateOfBirth}
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
                  placeholder={infoSitter?.rates}
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
                <Field name="city" as="select">
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
                <Field name="neighborhood" as="select">
                  <option disabled value="">
                    {infoSitter.neighborhood
                      ? infoSitter.neighborhood
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
                placeholder={infoSitter?.address}
              />
              <ErrorMessage
                name="address"
                component={() => (
                  <div className={styles.error}>{errors.address}</div>
                )}
              />
            </div>
            <div className="">
              <label htmlFor="description">Descripcion</label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder={infoSitter?.description}
              />
              <ErrorMessage
                name="description"
                component={() => (
                  <div className={styles.error}>{errors.description}</div>
                )}
              />
            </div>
            <button type="submit">GUARDAR CAMBIOS</button>
            {formSent && (
              <p className={styles.success}>Cambios guardados con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormInfoSitter;

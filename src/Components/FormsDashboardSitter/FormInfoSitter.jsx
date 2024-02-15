import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./FormInfoSitter.module.css";
import { Barrios } from "../../Helpers/Barrios";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { sitterInfo, updateSitter } from "../../redux/sitterSlice";


const FormInfoSitter = () => {
  const [formSent, setFormSent] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const infoSitter = useSelector((state) => state.sitter);
  console.log(id);
  
  const currentSitter = async () => {
    console.log("hola");
    try {
      const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
      console.log(data);
      dispatch(sitterInfo(data));
      console.log("he despachado");
      console.log(infoSitter);
    } catch (error) {
      console.log("Error al hacer el dispatch");
    }
  };

  const handleFormSubmit = async (values, dispatch, resetForm, setFormSent) => {
    try {
      const {
        name,
        surName,
        phone,
        description,
        dateOfBirth,
        email,
        password,
        address,
        neighborhood,
        city,
        rates,
      } = values;
      console.log("Valores: ", values);
      // Llamo a la acción updateSitter del slice para enviar los datos actualizados.
      await dispatch(
        updateSitter({
          id: id,
          updatedSitter: {
            name,
            surName,
            phone,
            description,
            dateOfBirth,
            email,
            password,
            address,
            neighborhood,
            city,
            rates,
          },
        })
      );

      resetForm();
      setFormSent(true);
      setTimeout(() => setFormSent(false), 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          name: infoSitter?.name || "",
          surName: infoSitter?.surname || "",
          phone: infoSitter?.phone || "",
          email: infoSitter?.email || "",
          address: infoSitter?.address || "",
          neighborhood: infoSitter?.neighborhood || "",
          city: infoSitter?.city || "",
          description: infoSitter?.description || "",
          rate: infoSitter?.rates || "",
        }}
        validate={(values) => {
          let errors = {};
          /* if (!values.name) {
             errors.name = "Por favor ingresa un nombre.";
           } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
             errors.name = "Ingresa solo letras y no más de 20 caracteres.";
           } */
          // if (!values.surname) {
          //   errors.surname = "Por favor ingresa un apellido.";
          // } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.surname)) {
          //   errors.surname = "Ingresa solo letras y no más de 20 caracteres.";
          // }
          // if (!values.dateOfBirth) {
          //   errors.dateOfBirth = "Por favor ingresa tu fecha de nacimiento.";
          // }
          // if (!values.rate) {
          //   errors.rate = "Por favor ingresa tu tarifa por día.";
          // } else if (!/^\d+(\.\d{1,2})?$/.test(values.rate)) {
          //   errors.rate = "Ingresa una tarifa válida.";
          // }
          // if (!values.email) {
          //   errors.email = "Por favor ingresa un mail.";
          // } else if (
          //   !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
          //     values.email
          //   )
          // ) {
          //   errors.email =
          //     "El correo solo puede contener letras, numeros, puntos, guiones, y guion bajo";
          // }
          // if (!values.phone) {
          //   errors.phone = "Por favor ingresa un telefono.";
          // } else if (!/^\d{10}$/.test(values.phone)) {
          //   errors.phone = "Ingresa solo numeros y no más de 10 caracteres.";
          // }

          // if (!values.neighborhood) {
          //   errors.neighborhood = "Por favor ingresa un Barrio.";
          // }
          // if (!values.city) {
          //   errors.city = "Por favor ingresa una ciudad.";
          // }
          // if (!values.description) {
          //   errors.description = "Por favor ingresa una descripcion.";
          // }

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
                  placeholder={infoSitter.name}
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
                  placeholder={infoSitter.surName}
                />
                <ErrorMessage
                  name="surName"
                  component={() => (
                    <div className={styles.error}>{errors.surname}</div>
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
                  placeholder={infoSitter.email}
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
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Tu contraseña..."
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
              <label htmlFor="telefono">Telefono</label>
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
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={infoSitter.dateOfBirth}
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
                  placeholder={infoSitter.rates}
                />
                <ErrorMessage
                  name="rates"
                  component={() => (
                    <div className={styles.error}>{errors.rate}</div>
                  )}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="city">ciudad</label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Ingresa tu ciudad..."
                />
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
                    Selecciona tu barrio
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
                id="Direccion"
                name="Direccion"
                placeholder={infoSitter.address}
              />
              <ErrorMessage
                name="Direccion"
                component={() => (
                  <div className={styles.error}>{errors.Direccion}</div>
                )}
              />
            </div>
            <div className="">
              <label htmlFor="description">Descripcion</label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder={infoSitter.description}
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

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Barrios } from "../../Helpers/Barrios";
import { Cities } from "../../Helpers/Cities";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { infoOwner, updateOwner } from "../../redux/OwnerSlice";
import axios from "axios";
import styles from "./FormDashboardDueño.module.css";

const FormDashboardDueño = () => {
  const [formSent, setFormSent] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const ownerInfo = useSelector((state) => state.owner);

  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/owners/${id}`);
      dispatch(infoOwner(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = async (values, dispatch, resetForm, setFormSent) => {
    try {
      const {
        name,
        surName,
        phone,
        email,
        password,
        address,
        neighborhood,
        city,
        rates,
      } = values;
      //  Llamo a la acción updateOwner del slice para enviar los datos actualizados.
      dispatch(
        updateOwner({
          updatedOwner: {
            id: id,
            name,
            surName,
            phone,
            email,
            password,
            address,
            neighborhood,
            city,
            rates,
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
          name: ownerInfo?.name || "",
          surName: ownerInfo?.surname || "",
          email: ownerInfo?.email || "",
          password: ownerInfo?.password || "",
          phone: ownerInfo?.phone || "",
          rate: ownerInfo?.rates || "",
          address: ownerInfo?.address || "",
          neighborhood: ownerInfo?.neighborhood || "",
          city: ownerInfo?.city || "",
        }}
        validate={(values) => {
          let errors = {};

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
                  placeholder={ownerInfo.name}
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
                  placeholder={ownerInfo.surName}
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
                  placeholder={ownerInfo.email}
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
                  placeholder={ownerInfo.password}
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="phone">Telefono</label>
                <Field
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder={ownerInfo.phone}
                />
                <ErrorMessage
                  name="phone"
                  component={() => (
                    <div className={styles.error}>{errors.phone}</div>
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={ownerInfo.dateOfBirth}
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component={() => (
                    <div className={styles.error}>{errors.dateOfBirth}</div>
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
                    {ownerInfo.neighborhood
                      ? ownerInfo.neighborhood
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
                placeholder={ownerInfo.address}
              />
              <ErrorMessage
                name="address"
                component={() => (
                  <div className={styles.error}>{errors.Direccion}</div>
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

export default FormDashboardDueño;

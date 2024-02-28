import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { sitterInfo, updateSitter } from "../../redux/sitterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Cities } from "../../Helpers/Cities";
import { Barrios } from "../../Helpers/Barrios";
import styles from "./FormInfoSitter.module.css";
import axios from "axios";

const FormInfoSitter = () => {
  const [formSent, setFormSent] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const infoSitter = useSelector((state) => state.sitter);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleEmailClose = () => setShowEmailModal(false);
  const handleEmailShow = () => setShowEmailModal(true);

  const dispatch = useDispatch();
  const { id } = useParams();
  const currentSitter = async () => {
    try {
      const { data } = await axios.get(
        `https://backendpawbnb-production.up.railway.app/sitters/${id}`
      );
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
            rates: Number(rates),
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
          if (values.name.length > 15) {
            errors.name = "El nombre no puede tener más de 15 caracteres";
          }
          if (values.surName.length > 15) {
            errors.surName = "El apellido no puede tener más de 15 caracteres";
          }
          if (values.phone.length > 10) {
            errors.phone = "El teléfono no puede tener más de 10 dígitos";
          }
          if (values.address.length > 20) {
            errors.address = "La dirección no puede tener más de 20 caracteres";
          }
          if (values.description.length > 200) {
            errors.description =
              "La descripción no puede tener más de 200 caracteres";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, dispatch, resetForm, setFormSent);
        }}
      >
        {({ isValid, errors, touched }) => (
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
                  type="text"
                  id="email"
                  name="email"
                  placeholder={infoSitter?.email}
                  disabled
                />
                <button
                  type="button"
                  onClick={handleEmailShow}
                  className="form button[type='submit']"
                >
                  Cambiar correo electrónico
                </button>
                <Modal show={showEmailModal} onHide={handleEmailClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Cambio de correo electrónico</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Para cambiar tu correo electrónico, por favor ponte en
                    contacto con el equipo de PawBnB.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleEmailClose}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="password">Contraseña</label>
                <Field
                  type="text"
                  id="password"
                  name="password"
                  placeholder={infoSitter?.password}
                  disabled
                />
                <button
                  type="button"
                  onClick={handleShow}
                  className="form button[type='submit']"
                >
                  Cambiar contraseña
                </button>
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Cambio de contraseña</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Para cambiar tu contraseña, por favor ponte en contacto con
                    el equipo de PawBnB.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 col-md-8">
                  <label htmlFor="phone">Telefono</label>
                  <Field
                    type="text"
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
              </div>
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
                <Field as="select" id="rates" name="rates">
                  <option value="" disabled>
                    Selecciona una tarifa
                  </option>
                  <option value="10">10 USD</option>
                  <option value="20">20 USD</option>
                  <option value="30">30 USD</option>
                </Field>
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
                <Field name="city" as="select" disabled>
                  <option value="CABA">CABA</option>
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
                as="textarea"
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
            <div className="col-12">
              <button
                type="submit"
                disabled={!isValid}
                style={{ cursor: isValid ? "pointer" : "not-allowed" }}
              >
                GUARDAR CAMBIOS
              </button>
              {formSent && (
                <p className={styles.success}>Cambios guardados con exito!</p>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormInfoSitter;

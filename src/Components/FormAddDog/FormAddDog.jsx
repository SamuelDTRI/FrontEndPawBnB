import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createDog } from "../../redux/dogsSlice";

import styles from "./FormAddDog.module.css";

const FormAddDog = () => {
  const [formSent, setFormSent] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleFormSubmit = async (values, dispatch, resetForm, setFormSent) => {
    console.log(values);
    try {
      const {
        name,
        breed,
        dateOfBirth,
        gender,
        description,
        feedingInstructions,
        allergies,
        medication,
        medicalCondition,
        vaccination,
        behavior,
      } = values;
      await dispatch(
        createDog({
          name,
          breed,
          dateOfBirth,
          gender,
          description,
          feedingInstructions,
          allergies,
          medication,
          medicalCondition,
          vaccination,
          behavior,
          ownerId: id,
        })
      );
      resetForm();
      setFormSent(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          breed: "",
          dateOfBirth: "",
          gender: "",
          description: "",
          feedingInstructions: "",
          allergies: "",
          medication: "",
          medicalCondition: "",
          behavior: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors.name = "Por favor ingresa el nombre de tu perro.";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
            errors.name = "Ingresa solo letras y no más de 20 caracteres.";
          }
          if (!values.breed) {
            errors.breed =
              "Por favor ingresa la raza de tu perro. Ej: Mestizo, Border Collie, Caniche, etc...";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.breed)) {
            errors.breed = "Ingresa solo letras y no más de 20 caracteres.";
          }

          if (!values.dateOfBirth) {
            errors.dateOfBirth = "Por favor ingresa su fecha de nacimiento.";
          }

          if (!values.gender) {
            errors.gender = "Por favor selecciona su genero";
          }

          if (!values.description) {
            errors.description =
              "Por favor ingresa breve descripcion de tu perro.";
          }

          if (!values.feedingInstructions) {
            errors.feedingInstruccions =
              "Por favor proporciona las instrucciones de alimentacios de tu perro.";
          }

          if (!values.vaccination) {
            errors.vaccination = "Por favor selecciona una opcion";
          }

          if (!values.allergies) {
            errors.allergies =
              "Por favor, proporciona información sobre las alergias de tu perro. Si no tiene ninguna, puedes escribir 'No'/'Ninguna'";
          }

          if (!values.medication) {
            errors.medication =
              "Por favor, proporciona información sobre la medicación de tu perro. Si no toma ninguna medicación, puedes escribir 'No'/'Ninguna'";
          }
          if (!values.medicalCondition) {
            errors.medicalCondition =
              "Por favor, proporciona información sobre la condición médica de tu perro. Si no tiene ninguna condición, puedes escribir 'No'/'Ninguna'.";
          }
          if (!values.behavior) {
            errors.behavior =
              "Por favor ingresa una descripcion del comportamiento de tu perro.";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log("submitingForm");
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
                  placeholder="Nombre de tu perro"
                />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className={styles.error}>{errors.name}</div>
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="breed">Raza</label>
                <Field
                  type="text"
                  id="breed"
                  name="breed"
                  placeholder="La raza de tu perro"
                />
                <ErrorMessage
                  name="breed"
                  component={() => (
                    <div className={styles.error}>{errors.breed}</div>
                  )}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="dd/mm/aaaa"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component={() => (
                    <div className={styles.error}>{errors.dateOfBirth}</div>
                  )}
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="gender">Género</label>
                <Field name="gender" as="select" className="">
                  <option value="">Selecciona el género</option>
                  <option value="male">Macho</option>
                  <option value="female">Hembra</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component={() => (
                    <div className={styles.error}>{errors.gender}</div>
                  )}
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="description">
                Cuentanos un poco sobre el/ella
              </label>
              <Field
                component="textarea"
                id="description"
                name="description"
                placeholder="ej: Mumi es la mejor compañera, le encanta jugar con su pelota y salir a
                diario al parque..."
              />
              <ErrorMessage
                name="description"
                component={() => (
                  <div className={styles.error}>{errors.description}</div>
                )}
              />
            </div>
            <h3>INFORMACION ADICIONAL</h3>
            <div className="col-12">
              <label htmlFor="feedingInstructions">
                Instrucciones de alimentacion
              </label>
              <Field
                component="textarea"
                id="feedingInstructions"
                name="feedingInstructions"
                placeholder="ej: 1 taza de alimento a la mañana, 1 taza a la tarde/noche"
              />
              <ErrorMessage
                name="feedingInstructions"
                component={() => (
                  <div className={styles.error}>
                    {errors.feedingInstructions}
                  </div>
                )}
              />
            </div>

            <div className="col-12">
              <label htmlFor="allergies">Alergias o restricciones</label>
              <Field
                component="textarea"
                id="allergies"
                name="allergies"
                placeholder="¿Tiene alergias o restricciones de algun tipo?"
              />
              <ErrorMessage
                name="allergies"
                component={() => (
                  <div className={styles.error}>{errors.allergies}</div>
                )}
              />
            </div>
            <div className="col-12">
              <label htmlFor="medication">Medicamentos</label>
              <Field
                component="textarea"
                id="medication"
                name="medication"
                placeholder="¿Toma alguna medicacion?"
              />
              <ErrorMessage
                name="medication"
                component={() => (
                  <div className={styles.error}>{errors.medication}</div>
                )}
              />
            </div>
            <div className="col-12">
              <label htmlFor="medicalCondition">
                Condicion medica (Pasada o presente)
              </label>
              <Field
                component="textarea"
                id="medicalCondition"
                name="medicalCondition"
                placeholder="¿Tiene o ha tenido alguna condición médica que el cuidador necesite conocer?"
              />
              <ErrorMessage
                name="medicalCondition"
                component={() => (
                  <div className={styles.error}>{errors.medicalCondition}</div>
                )}
              />
            </div>
            <div className="col-12">
              <label htmlFor="vaccination">
                Calendario de vacunacion al dia
              </label>
              <Field name="vaccination" as="select" className="">
                <option value="">Selecciona una opcion</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Field>
              <ErrorMessage
                name="vaccination"
                component={() => (
                  <div className={styles.error}>{errors.vaccination}</div>
                )}
              />
            </div>
            <div className="col-12">
              <label htmlFor="behavior">Historial de comportamiento</label>
              <Field
                component="textarea"
                id="behavior"
                name="behavior"
                placeholder="Describe el comportamiento de tu mascota, incluyendo cualquier detalle relevante que el cuidador deba conocer. Ejemplos: reacciones ante otros animales, preferencias, comportamientos especiales, etc."
              />
              <ErrorMessage
                name="behavior"
                component={() => (
                  <div className={styles.error}>{errors.behavior}</div>
                )}
              />
            </div>
            <button type="submit">AGREGAR PERRO</button>
            {formSent && (
              <p className={styles.success}>Perrito agregado con exito!</p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAddDog;
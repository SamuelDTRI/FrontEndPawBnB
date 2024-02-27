import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import styles from "./DogsInfo.module.css";
import PropTypes from "prop-types";

const DogsInfo = ({dogsList}) => {
    //Definimos los valores iniciales del formulario.
        // eslint-disable-next-line no-unused-vars
    const [initialValues, setInitialValues] = useState({
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
    });
  //Definimos el primer elemento del arreglo como el primer dato a mostrar.
    const [currentDog, setCurrentDog] = useState(dogsList[0])
  //Definimos el valor de la fecha de nacimiento en un formato compatible con el campo del formulario
    const formattedDate = new Date(currentDog.dateOfBirth).toLocaleDateString("es-ES");
  //Función para seleccionar los datos que se muestran
    const handleDogClick = (index) => {
        setCurrentDog(dogsList[index]);
    };

    return (
        <Formik
            initialValues={{}}
                // eslint-disable-next-line no-unused-vars
            validate={(values) => {
                let errors = {};

                return errors;
            }}
                // eslint-disable-next-line no-unused-vars
            onSubmit={(values, { resetForm }) => {
                // handleFormSubmit(values, dispatch, resetForm, setFormSent);
            }}>
            {({ errors }) => (
                <Form className={`container ${styles.form}`}>
                    <div className="d-flex col-12">
                        {dogsList?.map((dog, index) => (
                        <button
                            key={index}
                            onClick={() => handleDogClick(index)}
                            className={`${styles.badge} ${
                            currentDog && currentDog.id === dog.id
                                ? styles.selectedBadge
                                : ""
                            }`}
                            type="button">
                            {dog.name}
                        </button>
                        ))}
                        {/* <button
                        onClick={() => handleAddNewDogClick()}
                        className={styles.badge}
                        type="button">
                        Agregar Nuevo
                        </button> */}
                    </div>
                    <h2>INFORMACIÓN SOBRE LAS MASCOTAS</h2>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                        <label htmlFor="name">Nombre</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            disabled={true}
                            placeholder={
                            currentDog?.name ? currentDog.name : "Nombre de tu perro..."
                            }
                            defaultValue={initialValues.name}
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
                            disabled={true}
                            placeholder={
                            currentDog?.breed
                                ? currentDog.breed
                                : "ej: Mestizo, Border Collie, etc.."
                            }
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
                                type="text"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                disabled={true}
                                placeholder={`${formattedDate}`}
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
                            <Field name="gender" as="select" className="" disabled={true}>
                                <option value="">
                                {currentDog?.gender
                                    ? currentDog.gender === "male"
                                    ? "Macho"
                                    : "Hembra"
                                    : "Selecciona su genero"}
                                </option>
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
                        <label htmlFor="description">Cuéntanos un poco sobre el/ella</label>
                        <Field
                        component="textarea"
                        id="description"
                        name="description"
                        disabled={true}
                        placeholder={
                            currentDog?.description
                            ? currentDog.description
                            : "ej: Mumi es la mejor compañera, le encanta jugar con su pelota y salir a diario al parque..."
                        }
                        />
                        <ErrorMessage
                        name="description"
                        component={() => (
                            <div className={styles.error}>{errors.description}</div>
                        )}
                        />
                    </div>
                    <h3>INFORMACIÓN ADICIONAL</h3>
                    <div className="col-12">
                        <label htmlFor="feedingInstructions">
                        Instrucciones de alimentación
                        </label>
                        <Field
                        component="textarea"
                        id="feedingInstructions"
                        name="feedingInstructions"
                        disabled={true}
                        placeholder={
                            currentDog?.feedingInstructions
                            ? currentDog.feedingInstructions
                            : "ej: 1 taza de alimento a la mañana, 1 taza a la tarde/noche"
                        }
                        />
                        <ErrorMessage
                        name="feedingInstructions"
                        component={() => (
                            <div className={styles.error}>{errors.feedingInstructions}</div>
                        )}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="allergies">Alergias o restricciones</label>
                        <Field
                        component="textarea"
                        id="allergies"
                        name="allergies"
                        disabled={true}
                        placeholder={
                            currentDog?.allergies
                            ? currentDog.allergies
                            : "¿Tiene alergias o restricciones de algún tipo?"
                        }
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
                        disabled={true}
                        placeholder={
                            currentDog?.medication
                            ? currentDog.medication
                            : "¿Toma alguna medicación?"
                        }
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
                        Condición medica (Pasada o presente)
                        </label>
                        <Field
                        component="textarea"
                        id="medicalCondition"
                        name="medicalCondition"
                        disabled={true}
                        placeholder={
                            currentDog?.medicalCondition
                            ? currentDog.medicalCondition
                            : "¿Tiene o ha tenido alguna condición médica que el cuidador necesite conocer?"
                        }
                        />
                        <ErrorMessage
                        name="medicalCondition"
                        component={() => (
                            <div className={styles.error}>{errors.medicalCondition}</div>
                        )}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="vaccination">Calendario de vacunación al dia</label>
                        <Field name="vaccination" as="select" className="" disabled={true}>
                        <option value="">
                            {currentDog?.vaccination
                            ? currentDog.vaccination
                            : "Selecciona una opción"}
                        </option>
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
                        disabled={true}
                        placeholder={
                            currentDog?.behavior
                            ? currentDog.behavior
                            : "Describe el comportamiento de tu mascota, incluyendo cualquier detalle relevante que el cuidador deba conocer. Ejemplos: reacciones ante otros animales, preferencias, comportamientos especiales, etc."
                        }
                        />
                        <ErrorMessage
                        name="behavior"
                        component={() => (
                            <div className={styles.error}>{errors.behavior}</div>
                        )}
                        />
                    </div>
                    {/* <button type="submit">AGREGAR PERRO</button>
                    {formSent && (
                        <p className={styles.success}>Perrito agregado con exito!</p>
                    )} */}
                </Form>
            )}
        </Formik>
    );
};

DogsInfo.propTypes = {
    dogsList: PropTypes.array.isRequired,
};

export default DogsInfo;

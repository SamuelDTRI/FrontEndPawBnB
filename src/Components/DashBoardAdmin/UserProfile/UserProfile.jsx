import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../redux/adminUsersSlice";
import { Barrios } from "../../../Helpers/Barrios.js";
import { Cities } from "../../../Helpers/Cities.js";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
    const { id, role } = useParams();
    
    const [formSent, setFormSent] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const userInfo = useSelector((state) => state.adminUsers.userInfo);
    console.log(userInfo)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserInfo(id,role))
    },[])
    const handleFormSubmit=() =>{

    };
    return (
      <div>
        <h1>USER PROFILE NEW</h1>
        <Formik
          initialValues={{
            name: userInfo?.name || "",
            surName: userInfo?.surname || "",
            email: userInfo?.email || "",
            password: userInfo?.password || "",
            phone: userInfo?.phone || "",
            rate: userInfo?.rates || "",
            address: userInfo?.address || "",
            neighborhood: userInfo?.neighborhood || "",
            city: userInfo?.city || "",
          }}
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
                    placeholder={userInfo.name}
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
                    placeholder={userInfo.surName}
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
                    placeholder={userInfo.email}
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
                    placeholder={userInfo.password}
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
                  <label htmlFor="phone">Teléfono</label>
                  <Field
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder={userInfo.phone}
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
                    value={userInfo.dateOfBirth}
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
                <label htmlFor="address">Dirección</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder={userInfo.address}
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
                <p className={styles.success}>Cambios guardados con éxito!</p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default UserProfile;
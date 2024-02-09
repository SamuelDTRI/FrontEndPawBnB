import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Formulario.module.css"
import {Barrios} from "./Barrios"

const Formulario = (text) => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  console.log(text)
  return (
    <>
      <Formik
        initialValues={{ 
          nombre: "", 
          apellido: "",
          correo:"",
          telefono:"",
          barrio:"",
          contraseña:""

         }}

        validate={(valores)=>{
          let errores = {};
          //Validacion Nombre
          if(!valores.nombre){
            errores.nombre="Por favor ingresa un nombre.";            
          }else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.nombre)){
            errores.nombre = "Ingresa solo letras y no más de 20 caracteres.";
          }
          //Validacion Apellido
          if(!valores.apellido){
            errores.apellido="Por favor ingresa un apellido.";            
          }else if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(valores.apellido)){
            errores.apellido = "Ingresa solo letras y no más de 20 caracteres.";
          }

          //Validacion Mail
          if(!valores.correo){
            errores.correo="Por favor ingresa un mail.";            
          }else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
            errores.correo = "El correo solo puede contener letras, numeros, puntos, guiones, y guion bajo";
          }

          //Validacion Telefono
          if(!valores.telefono){
            errores.telefono="Por favor ingresa un telefono.";            
          }else if (!/^\d{10}$/.test(valores.telefono)){
            errores.telefono = "Ingresa solo numeros y no más de 10 caracteres.";
          }

          //Validacion Codigo Postal (YA NO, USAR BARRIO, SELECCIONAR, 
          
          if(!valores.barrio){
            errores.barrio="Por favor ingresa un Barrio.";            
          }

          return errores;

        }}
        onSubmit={(valores,{resetForm}) => {
          resetForm();
          console.log("Se enviaron los datos");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false),5000);
        }}
      >
        {( {errors}) => (
          //{( {values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form className={styles.formulario}>
            <h2>{text.text}</h2>
           
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu primer nombre..."
            
              />
              <ErrorMessage name="nombre" component={() => (
                <div className={styles.error}>{errors.nombre}</div>
              )} />
            </div>
            <div>
              <label htmlFor="apellido">Apellido</label>
              <Field
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Tu apellido..."
                
              />
              <ErrorMessage name="apellido" component={() => (
                <div className={styles.error}>{errors.apellido}</div>
              )} />
            </div>
            <div>
              <label htmlFor="correo">Email</label>
              <Field
                type="email"
                id="correo"
                name="correo"
                placeholder="example@gmail.com"
          
              />
              <ErrorMessage name="correo" component={() => (
                <div className={styles.error}>{errors.correo}</div>
              )} />
            </div>
            <div>
              <label htmlFor="telefono">Telefono</label>
              <Field
                type="number"
                id="telefono"
                name="telefono"
                placeholder="Tu telefono..."
                
              />
              <ErrorMessage name="telefono" component={() => (
                <div className={styles.error}>{errors.telefono}</div>
              )} />
            </div>
            <div>
              <label htmlFor="barrio">Barrio</label>
              <Field name="barrio" as="select">
                <option selected disabled value="" >Selecciona tu barrio</option>
                {Barrios?.map((barrio) =>{ return (<option key={barrio} value={barrio}>{barrio}</option>)}) } 
                              
              </Field>
              <ErrorMessage name="barrio" component={() => (
                <div className={styles.error}>{errors.barrio}</div>
              )} />
            </div>
            <button type="submit">REGISTRARSE</button>
            {formularioEnviado && <p className={styles.exito}>Formulario enviado con exito!</p>}
            
          </Form>
        )}
      </Formik>
      
    </>
  );
};

export default Formulario;

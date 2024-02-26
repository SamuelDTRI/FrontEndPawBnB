import style from "./EligePawbnb.module.css";
import dog from "../../Components/imagenes/perros/dog2.jpg";
import { useEffect } from "react";

const EligePawbnb = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
  <>
  <img src={dog} alt="perro durmiendo" className={style.imgDog}/>

  <div className={style.divParrafo}>
    <div className={style.aboutUs}>
      <h2>Acerca de PawBnb</h2>
      <p>
        PawBnb nació en 2024 de la visión de ocho estudiantes de programación 
        que querían crear un Airbnb para perros. Desde entonces, hemos crecido 
        hasta convertirnos en la plataforma líder en la ciudad de Buenos Aires, 
        Argentinacon, con cientos de cuidadores confiables y dueños de mascotas 
        satisfechos. Cada día, nuestros cuidadores ofrecen experiencias únicas
        que permiten a los dueños de perros conectarse con comunidades de una 
        manera auténtica y amorosa.
      </p>
    </div>
  </div>

  <div className={style.factsContainer}>
    <div className={style.divDiv}>
      <div className={style.fact}>
        <h1 className={style.texts}>+100 k</h1>
        <p className={style.parrafo}>reservaciones registradss.</p>
      </div>
      <div className={style.fact}>
        <h1 className={style.texts}>+30 </h1>
        <p className={style.parrafo}>colonias de Buenos Aires.</p>
      </div>
    </div>
    <div className={style.divDiv}>
      <div className={style.fact}>
        <h1 className={style.texts}>+100 k</h1>
        <p className={style.parrafo}>perros felices hospedados.</p>
      </div>
      <div className={style.fact}>
        <h1 className={style.texts}>+100 k</h1>
        <p className={style.parrafo}>duenos beneficiados.</p>
      </div>
    </div>
    <div className={style.divDiv}>
      <div className={style.fact}>
        <div>
          <h1 className={style.texts}>+50 k</h1>
          <p className={style.parrafo}>cuidadores registrados.</p>
        </div>
      </div>
      <div className={style.fact}>
        <h1 className={style.texts}>+70 k</h1>
        <p className={style.parrafo}>ya no se que poner.</p>
      </div>
    </div>
  </div>

  <div className={style.contratanos}>
    <div className={style.contratanosTexs}>
      <h2>Por qué unirte a nuestra comunidad</h2>
    <p>
      En PawBnb, nuestra comunidad es más que solo una plataforma de cuidado de
      mascotas; es una red de amantes de los animales comprometidos con el bienestar
      de todas las mascotas. Aquí hay algunas razones por las que deberías considerar 
      unirte a nuestra creciente comunidad:
    </p>
    <p><strong>Confianza y seguridad:</strong> Todos nuestros cuidadores son verificados 
    y evaluados para garantizar un entorno seguro para tu mascota.</p>

      <p><strong>Variedad de opciones:</strong> Con una amplia gama de cuidadores y 
      servicios disponibles, puedes encontrar la opción perfecta que se adapte a las 
      necesidades únicas de tu mascota.</p>
      <p><strong>Apoyo y asistencia:</strong> Nuestro equipo de atención al cliente está 
      disponible las 24 horas del día, los 7 días de la semana, para responder a cualquier 
      pregunta o preocupación que puedas tener.</p>
    
    <p>
      Únete a PawBnb hoy y descubre una comunidad dedicada a hacer que la experiencia de 
      cuidar a tu mascota sea más fácil, segura y gratificante que nunca.
    </p>
    </div>
  </div>
  </>
  )
};

export default EligePawbnb;
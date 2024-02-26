import style from "./AyudaFaq.module.css";
import dog4 from "../../Components/imagenes/perros/dog4.jpg"
import { useEffect } from "react";


const AyudaFaq = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <div className={style.divContainer}>
      <div className={style.divTexto}>
        <h1 className={style.font}>Preguntas principales</h1>
        <p className={style.parrafoTitulo}>Nuestros usuarios en PawBnb tienen preguntas y nosotros tenemos las respuestas. 
          Compilamos las preguntas más comunes que recibimos y sus respuestas, 
          y agregamos vínculos que llevan a instructivos y artículos útiles del 
          Centro de ayuda. De esta manera, podrás obtener toda la información 
          que necesitas con rapidez.</p>
      </div>
    </div>
    <img src={dog4} alt="perro" className={style.img} />

      {/* <hr /> */}
      
    <div className={style.factsContainer}>
      <div className={style.divDiv}>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Cómo puedo registrarme como cuidador en PawBnb?</h5>
          <hr />
          <p className={style.parrafo}>Simplemente visita nuestro sitio web, crea una cuenta 
          y completa tu perfil con la información requerida. Una vez verificado, podrás ser 
          cuidador de mascotas.</p>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Cuáles son los requisitos para ser un cuidador de mascotas? </h5>
          <hr />
          <p className={style.parrafo}>Para convertirte en un cuidador de mascotas en PawBnb, debes ser 
          mayor de edad y cumplir con los requisitos legales para cuidar animales en tu área. Además, es 
          importante demostrar tu experiencia y compromiso con el cuidado de mascotas a través de tu perfil.</p>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Cómo se establecen las tarifas de los cuidadores en PawBnb?</h5>
          <hr />
          <p className={style.parrafo}>Las tarifas de los cuidadores en PawBnb son establecidas por los propios 
          cuidadores, quienes pueden fijar sus precios según la duración de la estancia, el tamaño de la mascota 
          y los servicios adicionales ofrecidos. Los precios pueden variar según la ubicación y la demanda.</p>
        </div>
      </div>

      <div className={style.divDiv}>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Cómo puedo reservar un cuidador para mi mascota?</h5>
          <hr />
          <p className={style.parrafo}>Simplemente busca en nuestra plataforma el cuidador que 
          mejor se adapte a tus necesidades, revisa sus perfiles y reseñas, y realiza una solicitud de reserva. .</p>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Qué sucede si mi mascota tiene necesidades especiales o requerimientos específicos?</h5>
          <hr />
          <p className={style.parrafo}>En el formulario que llenas cuando te registras en PawBnb, hay un apartado especial para 
          los datos de tu mascota, ahi es donde puedes informar todo acerda de tu perro.  Muchos cuidadores están capacitados 
          para atender diferentes necesidades.</p>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Qué debo llevar cuando dejo a mi mascota con un cuidador en PawBnb?</h5>
          <hr />
          <p className={style.parrafo}>Es importante proporcionar toda la información relevante sobre sus necesidades, 
          incluyendo su alimentación, medicamentos (si los tiene), juguetes favoritos, y cualquier otra instrucción 
          especial. </p>
        </div>
      </div>

      <div className={style.divDiv}>
        <div className={style.fact}>
          <div>
            <h5 className={style.texts}>¿Qué medidas de seguridad tiene PawBnb para garantizar el bienestar de mi mascota?</h5>
            <hr />
            <p className={style.parrafo}>En PawBnb, nos tomamos muy en serio la seguridad y el bienestar de todas las mascotas. 
            Todos nuestros cuidadores pasan por un proceso de verificación y revisión de antecedentes, y ofrecemos un sistema 
            de reseñas y calificaciones para garantizar la calidad del servicio.</p>
          </div>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Qué puedo hacer para mejorar el comportamiento de mi perro?</h5>
          <hr />
          <p>Consejos para mejorar el comportamiento de los perros:</p>
          <a href="https://www.tiendanimal.es/articulos/10-tips-que-mejoran-el-comportamiento-de-los-perros/" className={style.enlace}>
           {"https://www.tiendanimal.es/articulos/10-tips-que-mejoran-el-comportamiento-de-los-perros/"}</a>
        </div>
        <div className={style.fact}>
          <h5 className={style.texts}>¿Qué debo hacer si tengo alguna preocupación o problema durante la estancia de mi mascota en PawBnb?</h5>
          <hr />
          <p className={style.parrafo}>En caso de que surja alguna preocupación o problema durante la estancia de tu mascota en PawBnb, te 
          recomendamos que te comuniques de inmediato con el equipo de soporte de nuestra plataforma, podras encontrar la informacion en el apartado de `${"Contactanos"}`</p>
        </div>
      </div>
    </div>  
    </>
  );
};

export default AyudaFaq;

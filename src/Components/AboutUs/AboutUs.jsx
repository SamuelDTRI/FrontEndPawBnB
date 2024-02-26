import style from "./AboutUs.module.css";
import NoPhoto from "../../Components/imagenes/fundadores/NoPhotoProfile.webp";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import perro from "../../Components/imagenes/perros/perro4.jpg";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={style.containerTitulo}>
        <h1>Quienes Somos</h1>
      </div>

      <div className={style.containerMision}>
        <h2>Misión:</h2>
        <p>Nuestra misión es conectar a amantes de los animales con cuidadores 
          de confianza en su vecindario, proporcionando una plataforma segura y 
          fácil de usar que garantice la tranquilidad de las mascotas y sus dueños. 
          Nos esforzamos por ofrecer una experiencia personalizada y excepcional, 
          donde cada mascota reciba el amor y la atención que se merece, mientras 
          sus dueños pueden disfrutar de la tranquilidad de saber que están en buenas manos.</p>
      </div>

      <div className={style.containerVision}>
        <h2>Visión:</h2>
        <p>Nuestra visión es ser la principal plataforma en línea para el cuidado de mascotas, 
          reconocida por nuestra dedicación a la seguridad, calidad y confianza. Buscamos crear 
          una comunidad inclusiva y colaborativa de cuidadores comprometidos y dueños responsables, 
          donde la comodidad y el bienestar de las mascotas sean siempre la prioridad. Aspiramos a 
          ser un referente en el sector, promoviendo el amor y el cuidado hacia los animales en todo 
          el mundo.</p>
      </div>


      <div className={style.divFundadores}>
        <h2>Fundadores:</h2>
        <div className={style.fundadoresContainer}>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p>NOMBRE</p>
          </div>
        </div>
      </div>
      
      <div className={style.containerOpera}>
        <h3 className={style.ache}>PawBnb opera en la mayoría de las localidades de Buenos Aires, Argentina.</h3>
        <Link to={"/localidades"}>
          <button className={style.button}>Ver Localidades</button>
        </Link>
      </div>
      {/* <img src={perro} alt="" /> */}
    </>
  )
};

export default AboutUs;

import style from "./AboutUs.module.css";
import NoPhoto from "../../Components/imagenes/fundadores/NoPhotoProfile.webp";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={style.containerTitulo}>
        <h1 className={style.titulo}>Quienes Somos</h1>
      </div>
      <img className={style.imgDog} src="https://res.cloudinary.com/dhec5eqoe/image/upload/v1708991497/PawBnB_Gallery/vqjbe4uekquexofask3b.jpg" alt="" />

      <div className={style.sectionMision}>
          <h2>Misión:</h2>
          <p>Nuestra misión es conectar a amantes de los animales con cuidadores 
            de confianza en su vecindario, proporcionando una plataforma segura y 
            fácil de usar que garantice la tranquilidad de las mascotas y sus dueños. 
            Nos esforzamos por ofrecer una experiencia personalizada y excepcional, 
            donde cada mascota reciba el amor y la atención que se merece, mientras 
            sus dueños pueden disfrutar de la tranquilidad de saber que están en buenas manos.</p>
      </div>
      

      <div className={style.sectionVision}>  
        <h2>Visión:</h2>
        <p>Nuestra visión es ser la principal plataforma en línea para el cuidado de mascotas, 
            reconocida por nuestra dedicación a la seguridad, calidad y confianza. Buscamos crear 
            una comunidad inclusiva y colaborativa de cuidadores comprometidos y dueños responsables, 
            donde la comodidad y el bienestar de las mascotas sean siempre la prioridad. Aspiramos a 
            ser un referente en el sector, promoviendo el amor y el cuidado hacia los animales en todo 
            el mundo.</p>
      </div>

      <div className={style.objetivosContainer}>
        <h2 className={StyleSheet.tituloObj}>Objetivos PawBnb</h2>
        <div className={style.objetivos}>
          <p>
            Conexión comunitaria: Unir a amantes de los animales para compartir experiencias y conocimientos.
            Comunidad comprometida: Construir una red sólida de cuidadores comprometidos y confiables.
            Amor animal: Inspirar y difundir el amor por los animales a través de historias y eventos inspiradores.
            Promover cuidado responsable: Educar sobre el bienestar animal y prácticas responsables.
            Educación en bienestar: Proporcionar recursos para promover el cuidado responsable de mascotas.
          </p>
        </div>
      </div>


      <div className={style.divFundadores}>
        <h1 className={style.tituloFundadores}>Fundadores:</h1>
        <div className={style.fundadoresContainer}>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Candela Dalmasso</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Jorge Osterrielt</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Jonatan Rodriguez </p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Larizza Leon</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Nicolas Soto</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Samuel Diaz</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Sebastian Rodirguez</p>
          </div>
          <div className={style.fundador}>
            <img src={NoPhoto} alt="" className={style.img} />
            <p className={style.nombres}>Walter</p>
          </div>
        </div>
      </div>
       <img className={style.imgDog} src="https://res.cloudinary.com/dhec5eqoe/image/upload/v1708617906/PawBnB_Gallery/dc9dj4aaen4p66fjcfs3.jpg" alt="" />
      
      <div className={style.containerOpera}>
        <h3 className={style.ache}>PawBnb opera en la mayoría de las localidades de Buenos Aires, Argentina.</h3>
        <Link to={"/localidades"}>
          <button className={style.button}>Ver Localidades</button>
        </Link>
      </div>
    </>
  )
};

export default AboutUs;

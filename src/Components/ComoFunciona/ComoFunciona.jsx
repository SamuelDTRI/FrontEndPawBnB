import { useEffect } from "react";
import style from "./ComoFunciona.module.css";
import dog3 from "../../Components/imagenes/perros/dog3.jpg";
import duena1 from "../../Components/imagenes/perros/cuidadora3.jpg";
import dog4 from "../../Components/imagenes/perros/dog9.jpg";
import perro from "../../Components/imagenes/perros/66.jpg";
import { useNavigate } from "react-router-dom";



const ComoFunciona = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSignUp = () => {
    navigate("/SignUp")
  }

  return (
  <>
  <div className={style.divTitulo}>
    <h1 className={style.titulo}>Asi funciona PawBnb</h1>
  </div>
  
  <div className="container">
    <div className="row">

      <div className="col-4 position-relative ">
        <div className={style.contenedorNro}><p className={style.numero}>1</p></div>
        <div className={style.photos}><img src={dog4} alt="computerDog" className={style.computerDogPhoto}/></div>
        <div className={style.conteinerObj}>
          <div className={style.conteinerText}>
            <p className={style.text}>REGISTRATE</p>
            <p className={style.text}>Crea tu cuenta completando nuestros sencillos formularios. Proporciona toda la información 
            importante sobre ti y tu mascota para encontrar el cuidador perfecto.</p>
          </div>
        </div>
      </div>
             
        <div className="col-4 position-relative">
          <div className={style.contenedorNro}><p className={style.numero}>2</p></div>
          <div className={style.photos}><img src={duena1} alt="viajaTranquilo" className={style.computerDogPhoto}/></div>
          
          <div className={style.conteinerObj}>
            <div className={style.conteinerText}>
              <p className={style.text}>ELIGE AL CUIDADOR QUE MAS TE LLAME LA ATENCION</p>
              <p className={style.text}>Explora nuestra comunidad de cuidadores y elige al que mejor se adapte a tus necesidades 
              y las de tu mascota. Comunica tus fechas y preferencias para coordinar con él.</p>
            </div>
          </div>
        </div>
             
        <div className="col-4 position-relative">
        <div className={style.contenedorNro}><p className={style.numero}>3</p></div>
        <div className={style.photos}><img src={dog3} alt="viajaTranquilo" className={style.computerDogPhoto}/></div>
          <div className={style.conteinerObj}>
            <div className={style.conteinerText}>
              <p className={style.text}>VIAJA CON TRANQUILIDAD</p>
              <p className={style.text}>Viaja sabiendo que tu mascota está en buenas manos. 
              Recibe actualizaciones periódicas y fotos de tu mascota durante su estancia con su cuidador.</p>
            </div>
          </div>
        </div>
    </div>
  </div>


  <button 
    className={style.btn}
    onClick={handleSignUp}>
      Empezar busqueda de cuidador
  </button>

  {/* <img src={perro} alt="" className={style.img}/> */}

  <div className={style.divParrafo}>
  <div className={style.parrafo}>
    <p>En PawBnb entendemos lo importante que es para ti poder disfrutar de tus vacaciones con total tranquilidad, 
      sabiendo que tu mascota está en las mejores manos posibles. Con nuestra plataforma, puedes confiar plenamente 
      en la calidad y profesionalismo de nuestros cuidadores, quienes han sido rigurosamente seleccionados y verificados 
      para garantizar el bienestar y la seguridad de tus peludos amigos. Así, puedes relajarte y disfrutar de tu tiempo 
      libre mientras recibes actualizaciones regulares y fotos de tu mascota, asegurándote de que está feliz y cuidada 
      en todo momento. Con PawBnb, viajar se convierte en una experiencia placentera y libre de preocupaciones, 
      permitiéndote disfrutar al máximo de tus merecidas vacaciones.</p>
  </div>
  </div>
  </>
  )
};

export default ComoFunciona;
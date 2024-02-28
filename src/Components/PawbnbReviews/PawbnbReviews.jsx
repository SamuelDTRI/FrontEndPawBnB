import style from "./PawbnbReviews.module.css";

import cuidador1 from "../../Components/imagenes/perros/cuidador1.jpg";
import cuidador2 from "../../Components/imagenes/perros/cuidador2.jpg";
import cuidadora1 from "../../Components/imagenes/perros/cuidadora1.jpg";
import duena1 from "../../Components/imagenes/perros/duena1.jpg";
import duena2 from "../../Components/imagenes/perros/duena2.jpg";
import dueno3 from "../../Components/imagenes/perros/dueno3.jpg";
import { useEffect } from "react";

const PawbnbReviews = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
  <>
  <div className={style.divtitulo}>
    <h1>Reviews de nuestros usuarios PawBnb</h1>
  </div>
  <hr className={style.hr}/>
  <div className={style.review}>
    <img src={cuidador1} alt="" className={style.img} />
    <div className={style.info}>
      <h4>Antonio</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>Como cuidador en PawBnb, he tenido experiencias increíbles con perros adorables. 
        La plataforma es fácil de usar y el equipo de soporte es genial.</p>
    </div>
  </div>

  <div className={style.review}>
    <img src={dueno3} alt="" className={style.img} />
    <div className={style.info}>
      <h4>Alejandro</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>PawBnb ha sido una solución increíble para encontrar cuidadores confiables. 
        ¡Me siento tranquilo sabiendo que mi perro está en buenas manos!</p>
    </div>
  </div>

  <div className={style.review}>
    <img src={duena1} alt="" className={style.img} />
    <div className={style.info}>
      <h4>Michel</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>Como dueño ocupado de un perro, PawBnb hace que sea fácil encontrar cuidadores para mi mascota. 
        Siempre he tenido experiencias positivas. ¡Gracias, PawBnb!</p>
    </div>
  </div>

  <div className={style.review}>
    <img src={cuidador2} alt=""  className={style.img}/>
    <div className={style.info}>
      <h4>Fernando</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>PawBnb me ha brindado la oportunidad de ganar dinero haciendo lo que amo: cuidar perros. 
        ¡Definitivamente recomendaría unirse como cuidador!</p>
    </div>
  </div>

  <div className={style.review}>
    <img src={cuidadora1} alt="" className={style.img}/>
    <div className={style.info}>
      <h4>Julia</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>Ser un cuidador en PawBnb ha sido una experiencia gratificante. Conocí a muchos perros 
        encantadores y sus dueños amables. ¡Me encanta!</p>
    </div>
  </div>

  <div className={style.review} >
    <img src={duena2} alt="" className={style.img} />
    <div className={style.info}>
      <h4>Elizabeth</h4>
      <div className={style.stars}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <p>PawBnb ha simplificado mi vida como dueño de perro. La plataforma es conveniente, 
      los cuidadores son amables y mi perro siempre regresa feliz. ¡Recomendado!</p>
    </div>
  </div>
  </>
  )
};

export default PawbnbReviews;
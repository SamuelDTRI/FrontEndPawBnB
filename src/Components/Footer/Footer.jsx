import { useNavigate } from "react-router-dom";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
      navigate(path);
  }

  return (
    <div className="card-group w-100 mt-5">
      <div className=" card text-center mb-3 bg-warning">
        <div className="card-body">
          <h3 className="card-title mb-3">Cuidadores locales</h3>
          <p className="card-subtitle mb-2 text-body-secondary">Belgrano</p>
          <p className="card-subtitle mb-2 text-body-secondary">Palermo</p>
          <p className="card-subtitle mb-2 text-body-secondary">San Isidro</p>
          <p className="card-subtitle mb-2 text-body-secondary">Recoleta</p>
          <p className="card-subtitle mb-2 text-body-secondary">
            Puerto Madero
          </p>
          <p className="card-subtitle mb-2 text-body-secondary">Nuñez</p>
          <p className="card-subtitle mb-2 text-body-secondary">Caballito</p>
        </div>
      </div>

      <div className="card text-center mb-3 bg-warning">
        <div className="card-body">

          <h3 className="card-title mb-3">Aprende mas</h3>

          <p className={style.cardLink} onClick={() => { handleNavigation("/como-funciona"); }}>Como funciona PawBnb</p>
          {/* <p className={style.cardLink} onClick={() => { handleNavigation("/tarifas"); }}>Tarifas de cuidadores locales</p> */}
          <p className={style.cardLink} onClick={() => { handleNavigation("/por-que-elegir"); }}>Por qué elegir PawBnb</p>
          <p className={style.cardLink} onClick={() => { handleNavigation("/reviewsPawbnb"); }}>Pawbnb reviews</p>

          <h3 className="card-title mb-3">Podemos ayudarte</h3>

          <p className={style.cardLink} onClick={() => { handleNavigation("/ayuda-faq"); }}>Ayuda y FAQ</p>
       
        </div>
     </div>

      <div className="card text-center mb-3 bg-warning">
        <div className="card-body">
          <h3 className="card-title mb-3">Conviértete en cuidador</h3>
          <p className="card-text">
            Se tu propio jefe. Ajusta tus tarifas y horarios. Conocerás perros
            asombrosos cerca tuyo
          </p>

          <Link to={"/SignUpSitters"}>
            <button className="btn btn-light text-black mb-3 border-black">
              Hazte cuidador
            </button>
          </Link>

          <h3 className="card-title mb-3">Contactanos</h3>
          <p>Buenos Aires, Argentina</p>
          
          <button 
          className={style.lastbtn}
          onClick={() => { window.location.href = 'mailto:pawbnb45@gmail.com'; }}>
            Hablemos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

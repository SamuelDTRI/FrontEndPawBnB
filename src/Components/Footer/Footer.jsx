import { useNavigate } from "react-router-dom";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNeighborhood } from "../../redux/localidadesSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const neighborhood = useSelector((state) => state.neighborhoodSitter.neighborhoods);
  const userRole = useSelector((state) => state.auth.userRole);
  const [alertOn, setAlertOn] = useState(false);

  const handleNavigation = (path) => {
      navigate(path);
  }

  const handleClick = () => {
    setAlertOn(true);
    setTimeout(() => {
      setAlertOn(false);
    }, 5000);
  }

  useEffect(() => {
    dispatch(fetchNeighborhood());
  }, [dispatch]);


  return (
    <>
    <div className={`container-fluid pt-5 ${style.divContainer}`}>

      <div className={`row pb-2 ${style.footerContainer}`}>


        <div className="col-xs-12 col-md-6 col-lg-4">
          <p className={`h5 mb-3 ${style.titulos}`}>APRENDE MAS</p>

          <hr className={style.hrstyle}/>
          <p className={style.cardLink} onClick={() => { handleNavigation("/como-funciona"); }}>Como funciona PawBnb</p>
          <p className={style.cardLink} onClick={() => { handleNavigation("/aboutUs"); }}>Sobre nosotros</p>
          <p className={style.cardLink} onClick={() => { handleNavigation("/por-que-elegir"); }}>Por qué elegir PawBnb</p>
          <p className={style.cardLink} onClick={() => { handleNavigation("/reviewsPawbnb"); }}>Pawbnb reviews</p>

          <hr className={style.hrstyle} />

          <p className={`h5 mb-3 ${style.titulos}`}>PODEMOS AYUDARTE</p>
          <hr className={style.hrstyle} />
          <p className={style.cardLink} onClick={() => { handleNavigation("/ayuda-faq"); }}>Ayuda y FAQ</p>
      
        </div>



        <div className="col-xs-12 col-md-6 col-lg-4">
          <p className={`h5 mb-3 ${style.titulos}`}>CUIDADORES LOCALES</p>

          <hr  className={style.hrstyle}/>

          <div className={style.principal}>
            <div className={style.verticalLine}></div>

            <div className={style.localidadesContainer}>
              {neighborhood.length > 10 ? (
                <>
                  {neighborhood.slice(0, 10).map((localidad) => (
                    <p key={localidad} className={style.localidades}>{localidad}</p>
                  ))}
                  <p className={style.localidadLink} onClick={() => { handleNavigation("/localidades") }}>Ver más localidades...</p>
                </>
                ) : (
                <>
                  {neighborhood.map((localidad) => (
                  <p key={localidad} className={style.localidades}>{localidad}</p>
                  ))}
                </>
              )}
                     
            </div>
            <div className={style.verticalLineDos}></div>
          
          </div>
        </div>



        <div className="col-xs-12 col-md-6 col-lg-4">
          <p className={`h5 mb-3 ${style.titulos}`}>CONVIERTETE EN CUIDADOR</p>
          <hr className={style.hrstyle} />
          <p className="mb-3">Se tu propio jefe. Ajusta tus tarifas y horarios. 
          Conocerás perros asombrosos cerca tuyo.</p>
          { userRole ? (
            <button className={style.btn} onClick={handleClick}>
              Hazte cuidador
            </button>
          ) : (
            <Link to={"/SignUpSitters"}>
              <button className={style.btn}>
                Hazte cuidador
              </button>
            </Link>
          )}
          {alertOn &&
          <div className={`alert alert-warning ${style.alertText}`} role="alert">
            <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
            ¡Ya estás registrado como cuidador!
          </div>
          }

          <hr className={style.hrstyle} />

          <p className={`h5 mb-3 ${style.titulos}`}>CONTACTANOS</p>
          <hr className={style.hrstyle} />
          <div >
            <a href="https://www.instagram.com/pawbnb_/" target="_blank" rel="noopener noreferrer" className={style.icons}><i className="bi bi-instagram"></i> @PawBnb_</a>
          </div>
          <div >
            <a href="https://www.facebook.com/profile.php?id=61556490524338" target="_blank" rel="noopener noreferrer" className={style.icons}><i className="bi bi-facebook"></i> PawBnb</a>
          </div>
          <div >
            <a href="https://twitter.com/paw_bnb" target="_blank" rel="noopener noreferrer" className={style.icons}><i className="bi bi-twitter-x"></i> @paw_bnb</a>
          </div>
          <div >
            <i className="bi bi-whatsapp"> 11 2345 6789</i>
          </div>
          <button 
          className={style.lastbtn}
          onClick={() => { window.location.href = 'mailto:pawbnb45@gmail.com'; }}>
           Envianos un correo
          </button>
        </div>

        <div className={`col-xs-12 pt-4 ${style.lastTextContainer}`}>
          <p className={style.lastText}>PawBnb. © 2024 • All rights reserved | Buenos Aires, Argentina.</p>
        </div>

      </div>

    </div>
    </>
  );
};

export default Footer;

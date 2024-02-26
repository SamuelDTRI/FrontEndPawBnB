import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./Alerts.module.css";
import { useState } from "react";
import { useEffect } from "react";

const Alerts = () => {
  const userRole = useSelector((state) => state.auth.userRole);
  const idUsuarioActual = useSelector((state) => state.auth.userId);
  const [formFiller, setFormFiller] = useState(false);
  const [formFillerOwner, setFormFillerOwner] = useState(false);

  // FORMULARIO DE CUIDADOR
  const sitterDoB = useSelector((state) => state.sitter.dateOfBirth);
  const sitterAddress = useSelector((state) => state.sitter.address);
  const sitterNeighborhood = useSelector((state) => state.sitter.neighborhood);
  const sitterDescription = useSelector((state) => state.sitter.description);
  const sitterRates = useSelector((state) => state.sitter.rates);
  
  useEffect(() => {
      if(sitterAddress && sitterDescription && sitterDoB && sitterNeighborhood && sitterRates) {
        setFormFiller(true);
      } else {
        setFormFiller(false);
      }
  }, [sitterAddress, sitterDescription, sitterDoB, sitterNeighborhood, sitterRates]);
  
  //FORMULARIO DE OWNER
  const ownerAddress = useSelector((state) => state.owner.address);
  const ownerNeighborhood = useSelector((state) => state.owner.neighborhood);
  
  // FORMULARIO DEL PERRO

  useEffect(() => {
    if(ownerAddress && ownerNeighborhood){
        setFormFillerOwner(true);
    } else {
        setFormFillerOwner(false);
      }
  }, [ownerAddress, ownerNeighborhood]);

  

  return (
    <>
      {/* Alerta para sitter cuando no haya llenado sus datos */}
      {userRole === 'DogSitter' && !formFiller &&
        <div className={`alert alert-warning ${style.alertText}`} role="alert">
          <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
          Completa tu perfil para poder recibir más reservas.
          <Link to={`/dashboardSitter/${idUsuarioActual}`} className="alert-link"> Completar perfil</Link>.
        </div>
      }

      {/* Alerta para Owner cuando no haya llenado sus datos */}
      {userRole === 'Owner' && !formFillerOwner &&
        <div className={`alert alert-warning ${style.alertText}`} role="alert">
          <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
          Completa tu perfil para poder realizar alguna reserva.
          <Link to={`/dashboardOwner/${idUsuarioActual}`} className="alert-link"> Completar perfil</Link>.
        </div>
      }

      {/* Alerta para Owner a la hora de querer hacer reserva */}
      {/* {userRole === 'Owner' && !formFillerOwner &&
        <div className={`alert alert-danger ${style.alertRed}`} role="alert">
          <div className={style.alertDiv}>
            <i className={`bi bi-exclamation-triangle-fill ${style.iconRed}`}></i>
            <h4>COMPLETAR FORMULARIO</h4>
          </div>

          <p>Para poder realizar una reservación, es necesario completar el formulario con toda la
            información solicitada tanto de usted como de su mascota.</p>
          <hr />

          <div className="row">
            <div className="col">
              <p className="mb-0"><Link to={`/dashboardOwner/${idUsuarioActual}`} className={style.link}>Ir al formulario...</Link></p>
            </div>
            <div className="col">
              <p className="mb-0"><button type="button" className={`btn btn-secondary ${style.btnCerrar}`} data-dismiss="alert">Cerrar</button></p>
            </div>
          </div>
        </div>
      } */}
    </>
  );
};

export default Alerts;
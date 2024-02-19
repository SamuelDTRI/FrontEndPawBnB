import style from "./AlertOwner.module.css";

const AlertOwner = ({id}) => {
    return (
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
            <p className="mb-0"><a href={`/dashboardOwner/${id}`} className={style.link}>Ir al formulario...</a></p>
          </div>
          <div className="col">
            <p className="mb-0"><button type="button" className={`btn btn-secondary ${style.btnCerrar}`}data-dismiss="alert">Cerrar</button></p>
          </div>
        </div>
      </div>
      
    )
}

export default AlertOwner;
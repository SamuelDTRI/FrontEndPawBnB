import styles from "./OwnerReservations.module.css"

const OwnerReservations = ()=>{
  
    return(
        <div className="container">
            <h2>MIS RESERVAS</h2>
            
            <div className="mt-5">
           <h3>PROXIMAS RESERVAS</h3>
             <div className={styles.contenedorDatos}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Cuidador : George</div>
                </div> 
             </div>            
            </div>

            <div className="mt-5">
           <h3>RESERVAS COMPLETADAS</h3>
             <div className={styles.contenedorDatos}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.textoDatos}`}>Cuidador: George</div>
                </div>
             </div>            
            </div>
        </div>
    )

}

export default OwnerReservations;


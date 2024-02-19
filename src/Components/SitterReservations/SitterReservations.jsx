import styles from "./SitterReservations.module.css"

const SitterReservations = ()=>{
  
    return(
        <div className="container">
           <h2>MIS RESERVAS</h2>
            
            <div className="mt-5">
           <h3>SOLICITUDES DE RESERVA</h3>
             <div className={styles.contenedorSolicitudes}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cliente: Candela/Snoopy</div>
                </div> 
                <button>VER SOLICITUD</button>
             </div>            
            </div>

            <div className="mt-5">
           <h3>PROXIMAS RESERVAS</h3>
             <div className={styles.contProxReservas}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador: George</div>
                </div> 
                <button>Ver detalles</button>
             </div>            
            </div>

            <div className="mt-5">
           <h3>RESERVAS ACTIVAS</h3>
             <div className={styles.contReservasActivas}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador: Candela/Snoopy</div>
                </div> 
                <button>Ver detalles</button>
             </div>            
            </div>

            <div className="mt-5">
           <h3>RESERVAS COMPLETADAS</h3>
             <div className={styles.contenedorSolicitudes}>
                <div className={`row ${styles.reservasCompletadas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: 24/7</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: 28/02</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador: Candela/Snoopy</div>
                </div> 
                <button>Ver detalles</button>
             </div>            
            </div>


        </div>
    )

}

export default SitterReservations;


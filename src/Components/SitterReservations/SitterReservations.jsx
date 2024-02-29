import styles from "./SitterReservations.module.css"
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import { GuardarReservas } from "../../redux/sitterReserveSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DetalleSolicitud from "../VerSolicitud/DetalleSolicitud";

const SitterReservations = ()=>{

const dispatch = useDispatch()
const today = new Date(); //contiene la fecha actual
const {id} = useParams();

//reservas filtradas por estados
const [solicitudesPendientes,setSolicitudesPendientes] = useState(null);
const [proximasReservas, setProximasReservas] = useState(null);
const [reservasActivas,setReservasActivas] = useState(null);
const [reservasCompletadas,setReservasCompletadas] = useState(null);


const [componenteActual,setComponenteActual] =useState("todasLasReservas");
const [reservaId, setReservaId] = useState(null);
const [actualizar, setActualizar] = useState(false)


// const [mostrarReserva,setMostrarReserva] = useState({
//    solicitudesDeReserva : false,
//    proximasReservas: false,
//    reservasActivas: false,
//    reservasCompletadas: false
// });
const sitterReserves=useSelector(state=>state.sitterReserve.reservas) 


const filtradasPorStatus = ()=>{
   console.log("sitterReserves", sitterReserves)
   console.log("today", today)
   if(sitterReserves.length){
      let solicitudes = sitterReserves.filter((reserva)=>reserva.status==="pendiente");
      let proximasReservas = sitterReserves.filter((reserva)=>reserva.status==="activo" 
      && new Date(reserva.dateCheckIn)>today);
      console.log("si entre", proximasReservas) 
      let reservasActivas = sitterReserves.filter((reserva)=>reserva.status === "activo"
      && new Date(reserva.dateCheckIn)<today && new Date(reserva.dateCheckOut)>today)
      let reservasCompletadas = sitterReserves.filter((reserva)=>reserva.status==="completado")
      if(solicitudes.length){setSolicitudesPendientes(solicitudes);}
      if(proximasReservas.length){setProximasReservas(proximasReservas);}
      if(reservasActivas.length){ setReservasActivas(reservasActivas);}
      if(reservasCompletadas.length){ setReservasCompletadas(reservasCompletadas);}
      console.log(solicitudesPendientes)
   }
   
}

useEffect(()=>{
   const fetchBookings = async ()=>{
      try {
         //guardamos todas las reservas en bookingsData
         const {data} = await axios.get("https://backendpawbnb-production.up.railway.app/bookings");
          if(data.length){
            const reservasFiltradas = data.filter((reserva)=>reserva.dogSitterId===id)
            await dispatch(GuardarReservas(reservasFiltradas))
          }

         // seteadoraDeReservas(BookingsDataComplete)
      } catch (error) {
         console.log("error al traer los datos")      
      }
   }
   fetchBookings();
   filtradasPorStatus()
   console.log("solicitudes pendientes : ", solicitudesPendientes)
   console.log("proximas reservas : ", proximasReservas)
   console.log("reservas activas : ", reservasActivas)
   console.log("reservas completadas : ", reservasCompletadas)
},[actualizar]);

const handleVerSolicitud=(id)=>{
   setReservaId(id),
   setComponenteActual("verSolicitud")
}

    return componenteActual === "todasLasReservas" ? (
      <div className="container">
        <div className={styles.contenedorDeBoton}>
          <button onClick={() => setActualizar(!actualizar)}>
            <i className={`bi bi-repeat ${styles.BtActualizar}`}></i>
          </button>
        </div>
        <div className="mb-5">
          <h2>MIS RESERVAS</h2>
        </div>

        <h5>SOLICITUDES DE RESERVA</h5>
        <div className="mt-5">
          {/* <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva,
               solicitudesDeReserva: !mostrarReserva.solicitudesDeReserva})}>
             </button>           */}
          {/* // mostrarReserva.solicitudesDeReserva &&  */}
          <div className={styles.contenedorSolicitudes}>
            {solicitudesPendientes != null &&
              solicitudesPendientes.map((solicitudIndiv, index) => (
                <div key={index} className={`row ${styles.contenedorFechas}`}>
                  <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                    Inicio:{" "}
                    {new Date(solicitudIndiv.dateCheckIn).toLocaleDateString()}
                  </div>
                  <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                    Salida:{" "}
                    {new Date(solicitudIndiv.dateCheckOut).toLocaleDateString()}
                  </div>
                  <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                    Cliente: {solicitudIndiv.Owner.name}
                  </div>
                  <button
                    onClick={() => handleVerSolicitud(solicitudIndiv.id)}
                    className={styles.button1}>
                    VER SOLICITUD
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-5">
          <h5>PROXIMAS RESERVAS</h5>
          {/* <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva,
            proximasReservas: !mostrarReserva.proximasReservas})}></button> */}
          <div className={styles.contProxReservas}>
            {
              // mostrarReserva.proximasReservas &&
              proximasReservas != null &&
                proximasReservas.map((proxReservaInd, index) => (
                  <div key={index} className={`row ${styles.contenedorFechas}`}>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Inicio:{" "}
                      {new Date(
                        proxReservaInd.dateCheckIn
                      ).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Salida:{" "}
                      {new Date(
                        proxReservaInd.dateCheckOut
                      ).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Cliente: {proxReservaInd.Owner.name}
                    </div>
                    <button
                      onClick={() => handleVerSolicitud(proxReservaInd.id)}
                      className={styles.button1}>
                      Ver detalles
                    </button>
                  </div>
                ))
            }
          </div>
        </div>

        <div className="mt-5">
          <h5>RESERVAS ACTIVAS</h5>
          {/* <button className= "bg-white text-dark"onClick={()=>setMostrarReserva({...mostrarReserva, reservasActivas: !mostrarReserva.reservasActivas})}>
            </button> */}
          <div className={styles.contReservasActivas}>
            {
              //   mostrarReserva.reservasActivas &&
              reservasActivas !== null &&
                reservasActivas.map((reservaActiva, index) => (
                  <div key={index} className={`row ${styles.contenedorFechas}`}>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Inicio:{" "}
                      {new Date(reservaActiva.dateCheckIn).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Salida:{" "}
                      {new Date(
                        reservaActiva.dateCheckOut
                      ).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Cliente: {reservaActiva.Owner.name}
                    </div>
                    <button
                      onClick={() => handleVerSolicitud(reservaActiva.id)}
                      className={styles.button1}>
                      Ver detalles
                    </button>
                  </div>
                ))
            }
          </div>
        </div>

        <div className="mt-5">
          <h5>RESERVAS COMPLETADAS</h5>
          {/* <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva, reservasCompletadas: !mostrarReserva.reservasCompletadas})}>
            </button> */}
          <div className={styles.contenedorSolicitudes}>
            {
              // mostrarReserva.reservasCompletadas &&
              reservasCompletadas !== null &&
                reservasCompletadas.map((reservCompletadaInd, index) => (
                  <div
                    key={index}
                    className={`row ${styles.reservasCompletadas}`}>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Inicio:{" "}
                      {new Date(
                        reservCompletadaInd.dateCheckIn
                      ).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Salida:{" "}
                      {new Date(
                        reservCompletadaInd.dateCheckOut
                      ).toLocaleDateString()}
                    </div>
                    <div className={`col-12 col-md-4 ${styles.iFsFC}`}>
                      Cliente: {reservCompletadaInd.Owner.name}
                    </div>
                    <button
                      onClick={() => handleVerSolicitud(reservCompletadaInd.id)}
                      className={styles.button1}>
                      Ver detalles
                    </button>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    ) : (
      <DetalleSolicitud id={reservaId} />
    );

};

export default SitterReservations;


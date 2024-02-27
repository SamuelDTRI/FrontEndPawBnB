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


const [mostrarReserva,setMostrarReserva] = useState({
   solicitudesDeReserva : false,
   proximasReservas: false,
   reservasActivas: false,
   reservasCompletadas: false
});
const sitterReserves=useSelector(state=>state.sitterReserve.reservas) 


const filtradasPorStatus = ()=>{
   console.log("sitterReserves", sitterReserves)
   console.log("today", today)
   if(sitterReserves.length){
      let solicitudes = sitterReserves.filter((reserva)=>reserva.status==="pendiente");
      let proximasReservas = sitterReserves.filter((reserva)=>reserva.status==="aprobado" 
      && new Date(reserva.dateCheckIn)>today);
      let reservasActivas = sitterReserves.filter((reserva)=>reserva.status === "aprobado"
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
},[actualizar]);

const handleVerSolicitud=(id)=>{
   setReservaId(id),
   setComponenteActual("verSolicitud")
}

    return(
      componenteActual==="todasLasReservas"?(
        
        <div className="container">
           
           <button onClick={()=>setActualizar(!actualizar)} >Actualizar</button>
           
           <h2>MIS RESERVAS</h2>
            
            <div className="mt-5">
              <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva,
               solicitudesDeReserva: !mostrarReserva.solicitudesDeReserva})}>
                <h3>SOLICITUDES DE RESERVA</h3>
             </button>          
            { 
            mostrarReserva.solicitudesDeReserva && solicitudesPendientes!=null && solicitudesPendientes.map((solicitudIndiv,index)=>
            (
            <div key={index} className={styles.contenedorSolicitudes}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: {new Date(solicitudIndiv.dateCheckIn).toLocaleDateString()}</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: {new Date(solicitudIndiv.dateCheckOut).toLocaleDateString()}</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cliente: {solicitudIndiv.Owner.name}</div>
                </div> 
                <button onClick={()=>handleVerSolicitud(solicitudIndiv.id)}>VER SOLICITUD</button>
             </div>
            ))   
            }         
            </div>

            <div className="mt-5">
           <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva,
            proximasReservas: !mostrarReserva.proximasReservas})}><h3>PROXIMAS RESERVAS</h3></button>
           { 
            mostrarReserva.proximasReservas && proximasReservas!=null && proximasReservas.map((proxReservaInd,index)=>
            (
             <div key={index} className={styles.contProxReservas}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: {new Date(proxReservaInd.dateCheckIn).toLocaleDateString()}</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: {new Date(proxReservaInd.dateCheckOut).toLocaleDateString()}</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador: {proxReservaInd.Owner.name}</div>
                </div> 
                <button onClick={()=>handleVerSolicitud(proxReservaInd.id)}>Ver detalles</button>
             </div>          
               ))
             } 
            </div>
           

            <div className="mt-5">
           <button className= "bg-white text-dark"onClick={()=>setMostrarReserva({...mostrarReserva, reservasActivas: !mostrarReserva.reservasActivas})}>
            <h3>RESERVAS ACTIVAS</h3>
            </button>
            { 
              mostrarReserva.reservasActivas && reservasActivas !== null && reservasActivas.map((reservaActiva,index) =>
             ( 
             <div key={index} className={styles.contReservasActivas}>
                <div className={`row ${styles.contenedorFechas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: {new Date(reservaActiva.dateCheckIn).toLocaleDateString()}</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: {new Date(reservaActiva.dateCheckOut).toLocaleDateString()}</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador:{reservaActiva.Owner.name}</div>
                </div> 
                <button onClick={()=>handleVerSolicitud(reservaActiva.id)}>Ver detalles</button>
             </div>            
            ))
           }
            </div>

            <div className="mt-5">
           <button className="bg-white text-dark" onClick={()=>setMostrarReserva({...mostrarReserva, reservasCompletadas: !mostrarReserva.reservasCompletadas})}>
            <h3>RESERVAS COMPLETADAS</h3>
            </button>
            {
               mostrarReserva.reservasCompletadas && reservasCompletadas !==null && reservasCompletadas.map((reservCompletadaInd,index)=>
               (    
                
                <div key={index} className={styles.contenedorSolicitudes}>
                <div className={`row ${styles.reservasCompletadas}`}>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Inicio: {new Date(reservCompletadaInd.dateCheckIn).toLocaleDateString()}</div> 
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Salida: {new Date(reservCompletadaInd.dateCheckOut).toLocaleDateString()}</div>
                <div className={`col-12 col-md-4 ${styles.iFsFC}`}>Cuidador: {reservCompletadaInd.Owner.name}</div>
                </div> 
                <button onClick={()=>handleVerSolicitud(reservCompletadaInd.id)}>Ver detalles</button>
                </div>     
               ))     
            }
            </div>

        </div>
    ) : (  
     <DetalleSolicitud id={reservaId}/>
    )
    );

};

export default SitterReservations;


import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    status: "Pendiente",
  },
  reducers: {
    aceptarReserva(state) {
      state.status = "Aceptada";
    },
    rechazarReserva(state) {
      state.status = "Rechazada";
    },
    marcarPendiente(state) {
      state.status = "Pendiente";
    },
  },
});

export const { aceptarReserva, rechazarReserva, marcarPendiente } =
  reservationSlice.actions;

export default reservationSlice.reducer;










// import {createSlice} from "@reduxjs/toolkit";
// import axios from "axios"

// const reservationSlice = createSlice ({
//     name: "reservation",
//     initialState:{
//         reservations:[], //Una matriz que almacenará las reservaciones.
//         currentReservation:"",  //Variable que guarda la reservación actual, es decir, la que se está mostrando en el detalle de una reservación.
//         currentReservation:"",  //Variable que guarda la reservación actualmente seleccionada en el listado de reservas.
//         success: false, //Un booleano que indica si la última operación fue exitosa.
//         error: null, //Almacena cualquier mensaje de error.
//         loading: true, // Un indicador booleano para mostrar si la aplicación está cargando datos.
//     },
//     reducers: {
//         getReservationsStart:(state)=> { //Cambia el estado loading a true cuando se inicia la obtención de las reservaciones.
//             state.loading=true;
//         },
//         getReservationsSuccess:(state, action) =>{ //Actualiza el estado con las reservaciones obtenidas y cambia loading a false y success a true.
//             return{
//                 ...state,
//                 reservations:action.payload,
//                 loading:false,
//                 success:true
//             }
//         },
//         addReservationStart:(state)=>{//Reinicia cualquier error existente cuando se inicia el proceso de agregar una nueva reserva.
//             state.error=null;
//         },
//         addReservationFail:(state, action)=>{//Actualiza el estado con el error y cambia loading a false
//             return{
//                 ...state,
//                 error: action.payload,
//                 loading:false
//             };
//         },
//         addReservationSuccess:(state, action)=>{ //Agrega una nueva reserva al estado y cambia loading a false y success a true.
//             const newReservation = action.payload;
//             state.reservations = [newReservation,...state.reservations]
//             state.loading=false;
//             state.success=true;
//         },
//         deleteReservation:(state, action)=>{//Elimina una reserva del estado según el ID proporcionado en la acción
//             let updatedList = state.reservations.filter(r=> r.id !== action.payload);
//             state.reservations = updatedList;
//         }
//     },
//     actions: {
//         //get all the reservations from server
//         getReservations: (dispatch) => {
//             dispatch(actions.getReservationsStart());
//             axios.get('/api/reservations')
//                 .then(response => {  
//                     console.log('Got Reservations', response.data); 
//                     dispatch(actions.getReservationsSuccess(response.data));
//                 })
//                 .catch((err) => {
//                     console.log("Error getting reservations", err.message);
//                     dispatch(actions.getReservationsFail(err.message))
//                 });
//         },
//         //add a new reservation to the list of reservations on the server and then
//     }
        
// });

// export const ReservationContext = createContext();
// export default reservationSlice.reducer;

// //Este contexto se utilizará para proporcionar el estado del slice a los componentes secundarios.
// /*function ReservationProvider({children}) {
//     const store = useReducer(reducer, initialState)};
    
//     //crear un store con un reducer y un estado inicial. Este componente envuelve la aplicación y proporciona el contexto ReservationContext con el valor del store creado
//     return <ReservationContext.Provider value={store}>{children}</ReservationContext.Provider>*/
    
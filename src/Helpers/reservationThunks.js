import { aceptarReserva, rechazarReserva, marcarPendiente } from "../redux/reservationSlice";

export const procesarReserva = (tiempoLimite) => (dispatch) => {
  setTimeout(() => {
    const estado = getState().reservation.status;
    if (estado === "Pendiente") {
      // Si la reserva está pendiente después del tiempo límite, la marcamos como rechazada
      dispatch(rechazarReserva());
      // Aquí puedes enviar un correo electrónico al cliente con la razón del rechazo
    }
  }, tiempoLimite);
};
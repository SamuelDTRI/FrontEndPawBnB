import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReservation = createAsyncThunk( //envia la reserva
  "reservations/sendReservation",
  async (valores) => {
    try {
      console.log({ valores });

      const peticion = {
        dateCheckIn: valores.dateCheckIn,
        dateCheckOut: valores.dateCheckOut,
        entryTime: valores.entryTime,
        dogId: valores.dogId,
        note: valores.note,
        status: valores.status,
        reviews: valores.reviews,
        ownerId: valores.ownerId,
        dogSitterId: valores.dogSitterId,
        rating: valores.rating,
      };
      console.log({ peticion: valores });

      let { data } = await axios.post(
        "https://backendpawbnb-production.up.railway.app/bookings",
        peticion
      );
      return data;
    } catch (error) {
      console.error({ mesagge: "Error al enviar la reserva: ", error });
      throw error;
    }
  }
);
export const updateStatus = createAsyncThunk( //actualiza el estado de la reserva
  "reservations/updateStatus",
  async ({ id, status }) => {
    try {
      const { data } = await axios.put (`https://backendpawbnb-production.up.railway.app/bookings/status/${id}`,{status});
      return data;
    }catch(error){
      console.error({ mesagge: "Error al actualizar el estado de la reserva", error });
      throw error;
    


    }
    
  }
);
//Almacen para los estados
export const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
    currentReservation: {},
  },
  reducer: {
    //Setea el estado state segun la action realizada
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setCurrentReservation: (state, action) => {
      state.currentReservation = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(getReservation.fulfilled, (state, action) => {
      state.reservations = [action.payload];
    });
    builder.addCase(sendReservation.fulfilled, (state, action) => {
      state.reservations = [...state.reservations, action.payload];
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const index = state.reservations.findIndex((item)=> item.id ===action.payload.id );
      if (index !== -1 ) {
        state.reservations[index]=action.payload; //actualiza el estado de la reserva
      } else {
        console.log("No se encontro la reserva");
      }
      
    })
  },
});

export const getReservation = createAsyncThunk (
  "reservation/getReservation",
  async ( id ) => {
    try {

      const { data } = await axios.get(`http://localhost:3000/bookings/owner/${id}`);
      console.log(data)
      
      return data;
    }catch(error){
      console.error({ mesagge: "Error al encontrar la reserva", error });
      throw error;
    }
  })

  //http://localhost:3000/bookings/owner/c928b4e0-d78f-4cb7-ab79-51e3ec508e1e

export const { setReservations, setCurrentReservation } =
  reservationSlice.actions;
export default reservationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReservation = createAsyncThunk(
  "reservations/sendReservation",
  async (valores) => {
    try {
      console.log({ valores });

      /*
      {
          status: "pendiente",
          reviews: "asdasd",
          rating: "5",
          ownerId: "30ac4dab-9de3-408c-9513-36cb3c3eabed",
          dogId: "5dc64e88-b7d0-4eaf-80b7-f8e956bce91d",
          dogSitterId: "277093e3-ea16-44cf-8fbc-59c93214ed76",
          dateCheckIn: "25/02/2024",
          dateCheckOut: "27/02/2024",
          entryTime: "10:30",
          note: "asdasf"
      }
      */
      const peticion = {
        startDate: "Hoy",
        status: "pendiente",
        reviews: "asdasdasd",
        rating: "4",
        ownerId: "30ac4dab-9de3-408c-9513-36cb3c3eabed",
        dogSitterId: "277093e3-ea16-44cf-8fbc-59c93214ed76",
        dogId: "5dc64e88-b7d0-4eaf-80b7-f8e956bce91d",
        deleted: false,
      };
      console.log({ peticion });

      // const peticion = {
      //   startDate: "Hoy",
      //   status: "pendiente",
      //   reviews: "asdasdasd",
      //   rating: "4",
      //   ownerId: "30ac4dab-9de3-408c-9513-36cb3c3eabed",
      //   dogSitterId: "277093e3-ea16-44cf-8fbc-59c93214ed76",
      //   dogId: "5dc64e88-b7d0-4eaf-80b7-f8e956bce91d",
      //   deleted: false,
      // };

      let { data } = await axios.post(
        "http://localhost:3000/bookings",
        peticion
      );
      return data;
    } catch (error) {
      console.error({ mesagge: "Error al enviar la reserva: ", error });
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
    builder.addCase(sendReservation.fulfilled, (state, action) => {
      state.reservations = [...state.reservations, action.payload];
    });
  },
});

export const { setReservations, setCurrentReservation } =
  reservationSlice.actions;
export default reservationSlice.reducer;

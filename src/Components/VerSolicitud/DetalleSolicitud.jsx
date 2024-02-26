import { useEffect, useState } from "react";
import styles from "./DetalleSolicitud.module.css";
import axios from "axios";
import { differenceInYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


// import { useHistory } from "react-router-dom";

const DetalleSolicitud = ({ id}) => {
  const [reserva, setReserva] = useState(null);
  const today = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const buscarReserva = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/bookings/${id}`
        );
        console.log("la data es", data);
        setReserva(data);
        console.log("El estado quedo como: ", data);
      } catch (error) {
        console.log(error);
      }
    };
    buscarReserva();
  }, []);

  if (!reserva) {
    return <div>Cargando...</div>;
  }

  const handleClickAceptar = () => {
    const actualizarReserva = async () => {
      try {
        let reservaModificada = await axios.put(
          `http://localhost:3000/bookings/status/${id}`,
          {status: "activo"} 
          );
           if(reservaModificada.status===200){
            setReserva(reservaModificada.data)
            alert("Solicitud aceptada");
            navigate("/Home")
           }
      } catch (error) {
        console.log(error);
      }
    };
     actualizarReserva()
  };

  const handleClickRechazar = () => {
    const actualizarReserva = async () => {
        try {
          let reservaModificada = await axios.put(
            `http://localhost:3000/bookings/status/${id}`,
            {status: "cancelado"} 
            );
            console.log(reservaModificada)
             if(reservaModificada.status===200){
              alert("Solicitud rechazada");
             }
             navigate("/Home")

        } catch (error) {
          console.log(error);
        }
      };
       actualizarReserva()
  };

  // console.log("El id es ", id)
  return (
    <div className="container my-4">
      <h2 className="mb-4 mt-5">DATOS DE LA RESERVA</h2>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Nombre :
        </label>
        <input
          type="text"
          className={`col-12 col-md-9 ${styles.input}`}
          value={reserva.Owner.name}
        />
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Ingreso :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={new Date(reserva.dateCheckIn).toLocaleDateString()}
        />
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Salida :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={new Date(reserva.dateCheckOut).toLocaleDateString()}
        />
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Notas :{" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="4"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.note}
        ></textarea>
      </div>

      <h2 className="mb-4 mt-5">INFORMACION DEL PERRO</h2>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Nombre :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={reserva.Dog.name}
        />
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Genero :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={reserva.Dog.gender}
        />
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Edad :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={today - new Date(reserva.Dog.dateOfBirth).toLocaleDateString()}
        />
        <label htmlFor="Nombre" className={`col-12 col-md-2 ${styles.label}`}>
          Raza :{" "}
        </label>
        <input
          type="text"
          className={`col-12 col-md-3 ${styles.input}`}
          value={reserva.Dog.breed}
        />
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Sobre {reserva.Dog.name} :
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="4"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.description}
        ></textarea>
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Historial de comportamiento :{" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="5"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.behavior}
        ></textarea>
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Instrucciones de alimentacion :{" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="5"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.feedingInstructions}
        ></textarea>
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Alergias a la comida o restricciones :{" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="5"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.allergies}
        ></textarea>
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Medicamentos :{" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="5"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.medication}
        ></textarea>
      </div>

      <div className="row m-5 mt-0 mb-3">
        <label htmlFor="Nombre" className={`col-12 col-md-12 ${styles.label}`}>
          Condicion medica (pasada o presente){" "}
        </label>
        <textarea
          name="Notas"
          id=""
          cols="20"
          rows="5"
          className={`col-12 col-md-12 ${styles.input}`}
          value={reserva.Dog.medicalCondition}
        ></textarea>
      </div>

      {reserva.status === "pendiente" ? (
        <div>
          <div className="row m-5 mt-0 mb-3">
            <button onClick={handleClickAceptar} id="aceptar">
              ACEPTAR SOLICITUD{" "}
            </button>
          </div>

          <div className="row m-5 mt-0 mb-3">
            <button onClick={handleClickRechazar} id="rechazar">
              RECHAZAR SOLICITUD{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetalleSolicitud;

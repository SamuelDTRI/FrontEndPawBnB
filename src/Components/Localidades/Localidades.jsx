import { useDispatch, useSelector } from "react-redux";
import style from "./Localidades.module.css";
import { useEffect } from "react";
import { fetchNeighborhood } from "../../redux/localidadesSlice";

const Localidades = () => {
    const dispatch = useDispatch();
    const neighborhood = useSelector((state) => state.neighborhoodSitter.neighborhoods);
    const sitterCount = useSelector((state) => state.neighborhoodSitter.sitterCount);

    useEffect(() => {
        dispatch (fetchNeighborhood())
        window.scrollTo(0, 0);
    }, [dispatch]);
    
  return (
    <>
    <div className={style.divTitulo}>
        <h2 className={style.titulo}>Encuentra un cuidador de perros cerca de ti</h2>
        <p className={style.parrafo}>¿Necesitas a alguien confiable para cuidar a tu amigo peludo mientras 
            estás ocupado? ¡No busques más! En PawBnb, te conectamos con cuidadores 
            de perros en tu vecindario. Imagina tener a alguien de confianza a solo 
            unos pasos de tu puerta, listo para brindar amor y cuidado a tu mascota 
            en su entorno familiar.  
            Descubre la tranquilidad de saber que tu mascota está en buenas manos, 
            cerca de ti. ¡Explora nuestra comunidad de cuidadores verificados y 
            encuentra al compañero perfecto para tu peludo amigo hoy mismo!</p>
    </div>

    <div>
        <h5 className={style.subtitulo}>Estas son todas las localidades con cuidadores:</h5>
        {neighborhood.map((localidad) => (
        <div className={style.divlocalidad} key={localidad}>
            <span>{localidad}</span>
            <span>{` (${sitterCount[localidad] || 0})`}</span> 
        </div>  
        ))}
    </div>
    </>
  )
};

export default Localidades;
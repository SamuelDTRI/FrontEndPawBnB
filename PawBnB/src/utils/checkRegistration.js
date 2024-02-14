import axios from "axios";

const checkRegistration = async (email) => {
    console.log(email)
    try {
        //esta función envía una solicitud al servidor para comprobar si el usuario ya se encuentra registrado
        const response = await axios.get(
            `http://localhost:3000/checkRegistration?email=${email}`
        );
        console.log(response.data)
        const { exist, checkId, checkRole} = response.data;
        return { exist, checkId, checkRole }; // Devuelve true si el usuario ya está registrado, false de lo contrario
    } catch (error) {
            console.error(
            "Error al verificar el estado de registro del usuario:",
            error
            );
        return false; // En caso de error, asumimos que el usuario no está registrado
    }
};  

export default checkRegistration;

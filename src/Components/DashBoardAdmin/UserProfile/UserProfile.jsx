import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../redux/adminUsersSlice";
import OwnerInfo from "../OwnerInfo/OwnerInfo.jsx";
import axios from "axios";
import SitterInfo from "../SitterInfo/SitterInfo.jsx";
import styles from "./UserProfile.module.css"
import DogsInfo from "../DogsInfo/DogsInfo.jsx";

const UserProfile = () => {
  const { id, role } = useParams();
  const userInfo = useSelector((state) => state.adminUsers.userInfo);
  const [editDisable, setEditDisable]= useState(true)
  const dispatch = useDispatch();
  //Constante que guarda la información de los perros del usuario.
  const dogsList = userInfo.Dogs ? userInfo.Dogs : [];
//Obtenemos la información del usuario
  useEffect(()=>{
      dispatch(getUserInfo(id,role))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
//Función de habilita o deshabilita la edición de la información del usuario
  const handleEdit= ()=> {
    setEditDisable(!editDisable);
  };
//Función de maneja el borrado lógico (suspension de la cuenta)
  const handleDelete= async ()=>{
    try {
      let deleteUrl;
      if (role === "Owner") {
        deleteUrl = `http://localhost:3000/owners/delete/${userInfo.id}`;
      } else if (role === "DogSitter") {
        deleteUrl = `http://localhost:3000/sitters/delete/${userInfo.id}`;
      } else {
        console.error("Rol de usuario no válido:", role);
        return;
      }
      if(userInfo.deleted){
        await axios.put(deleteUrl, { deleted: false });
      } else {
        await axios.put(deleteUrl, { deleted: true });
      }
      dispatch(getUserInfo(id, role));
    } catch (error) {
      console.error("Error al procesar la solicitud de borrado lógico:", error);
    }
  }
  //Función para manejar el envió del formulario
  const handleFormSubmit = async (values, dispatch, resetForm) => {
    try {
      let updateUrl;
      if (role === "Owner") {
        updateUrl = `http://localhost:3000/owners/${userInfo.id}`;
      } else if (role === "DogSitter") {
        updateUrl = `http://localhost:3000/sitters/${userInfo.id}`;
      } else {
        console.error("Rol de usuario no válido:", role);
        return;
      }
      await axios.put(updateUrl,values);
      dispatch(getUserInfo(userInfo.id, role));
      setEditDisable(!editDisable);
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <div>
      {userInfo.deleted ? (
        <div className={styles.accountStatus}>
          <h4>Cuenta Suspendida.-</h4>{" "}
          <button
            onClick={() => handleDelete()}
            className={`${styles.actionButton} ${styles.suspendedAccount}`}>
            Activar
          </button>
          <h4>{`${userInfo.role}`}</h4>
        </div>
      ) : (
        <div className={styles.accountStatus}>
          <h4>Cuenta Activa.-</h4>
          <button
            onClick={() => handleDelete()}
            className={styles.actionButton}>
            Suspender
          </button>
          <h4>{`${userInfo.role}`}</h4>
        </div>
      )}
      {role === "Owner" ? (
        <div>
          <button
            onClick={() => handleEdit()}
            className={styles.editInfoButton}
            style={
              editDisable
                ? { backgroundColor: " #ffa319" }
                : { backgroundColor: " #7582a1" }
            }>
            Editar Info
          </button>
          <OwnerInfo
            userInfo={userInfo}
            editDisable={editDisable}
            handleFormSubmit={handleFormSubmit}
          />
          {dogsList.length>0? <DogsInfo dogsList={dogsList}/> : <h3 className={styles.dogsTittle}>El usuario no tiene perros registrados.</h3>}
        </div>
      ) : (
        <div>
          <button
            onClick={() => handleEdit()}
            className={styles.editInfoButton}
            style={
              editDisable
                ? { backgroundColor: " #ffa319" }
                : { backgroundColor: " #7582a1" }
            }>
            Editar Info
          </button>
          <SitterInfo
            userInfo={userInfo}
            editDisable={editDisable}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
import React from "react";
import FormDashboardDueño from "../../Components/FormDashboardDueño/FormDashboardDueño";
import LinksDashboardOwner from "../../Components/LinksDashboardOwner/LinksDashboardOwner";
import styles from "./DashboardOwner.module.css";
import { useDispatch, useSelector } from "react-redux";
import GallerySitters from "../../Components/GallerySitters/GallerySitters";
import { useEffect, useState } from "react";
import axios from "axios";
import { infoOwner } from "../../redux/ownerSlice";
import { useParams } from "react-router-dom";
import FormAddDog from "../../Components/FormAddDog/FormAddDog";

const DashboardOwner = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const dogsList = useSelector((state) => state.dogs.dogsList);
  const linkActivo = useSelector((state) => state.dashboard.linksActiveOwner);
  const ownerInfo = useSelector((state) => state.owner);

  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/owners/${id}`);
      dispatch(infoOwner(data));
    } catch (error) {
      console.error("Error al obtener los datos del cuidador:", error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch]);

  // const previewFiles = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImgProfile(reader.result);
  //   };
  //   console.log(imgProfile);
  // };

  // const handleChange = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
  //   previewFiles(file);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const result = await axios.put(
  //     "http://localhost:3000/sitters/f1e014dd-db26-4836-9ffc-ea102887b4d9",
  //     {
  //       photoProfile: imgProfile,
  //     }
  //   );
  //   try {
  //     console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(linkActivo);
  return (
    <div className="container my-5 ">
      <div className="row">
        <div className={`col-md-3 col-sm-12 ${styles.sideBarContainer}`}>
          
          <div className="row">
            <h3>{ownerInfo.name}</h3>
          </div>
          <hr />
          <LinksDashboardOwner />
        </div>
        <div className="container my-5 ">
          <div className="row">
            <div
              className={`col-md-8 col-sm-12 ms-3 ms-sm-4 sm-my-3 ${styles.formContainer}`}
            >
              {linkActivo === "miGaleria" ? (
                <GallerySitters />
              ) : (
                <>
                  {/* <div className="d-flex">
                    {dogsList.map((dog) => (
                      <span key={dog.id} className="badge bg-secondary mx-1">
                        {dog.name}
                      </span>
                    ))}
                    <span className="badge bg-success mx-1">Agregar Nuevo</span>
                  </div> */}
                  <h2>INFORMACION DE MI PERRO</h2>
                  <FormAddDog />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOwner;

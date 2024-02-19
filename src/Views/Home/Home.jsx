import React from "react";
import Cards from "../../Components/Cards/Cards";
import Filter from "../../Components/Filter/Filter";
import { useEffect } from "react";
import { addDogsister } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./Home.module.css";
import { useParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const completedProfile = useSelector((state) => state.sitter.completedProfile)


  useEffect(() => {
    const dogsisterAsync = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/sitters');
        dispatch(addDogsister(data));
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }
    dogsisterAsync();

  }, [])

  return (
    <div>
      {!completedProfile && <div className={`alert alert-warning ${style.alertText}`} role="alert">
        <i className={`bi bi-exclamation-triangle-fill ${style.icon}`}></i>
        Completa tu perfil para poder recibir mas reservas. <a href={`/dashboardSitter/${id}`} className="alert-link">Completar perfil</a>. 
      </div>}

      <div className={style.homeContainer}>
        <Filter/>
        <Cards/>
      </div >
    </div>
  );
};

export default Home;

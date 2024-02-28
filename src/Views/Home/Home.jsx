import React from "react";
import Cards from "../../Components/Cards/Cards";
import Filter from "../../Components/Filter/Filter";
import { useEffect } from "react";
import { addDogsister, addAllReview } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./Home.module.css";
import { useParams } from "react-router-dom";
import FormReview from "../../Components/FormReview/FormReview";


const Home = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const dogsisterAsync = async () => {
      try {
        const { data } = await axios.get("https://backendpawbnb-production.up.railway.app/sitters");
        dispatch(addDogsister(data));
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }

    const reviewAsync = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/review`);
        dispatch(addAllReview(data));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    reviewAsync();
    dogsisterAsync();

  }, [])

  return (
    <div>
      <div className={style.homeContainer}>
        {/*componente del Formulario de review, utiizar solo para probar comentarios
        <FormReview dogSitterId='ed8760c0-07a9-4838-8522-9e239c52cb80' 
        ownerId='7edf8b7b-26d1-4ea5-9197-7b50c54d20e7'/> */}
        <Filter/>
        <Cards/>
      </div >
    </div>
  );
};

export default Home;

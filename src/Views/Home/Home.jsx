import React, { useState } from "react";
import Cards from "../../Components/Cards/Cards";
import Filter from "../../Components/Filter/Filter";
import { useEffect } from "react";
import { addDogsister, addAllReview } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./Home.module.css";
import { useParams } from "react-router-dom";
import FormReview from "../../Components/FormReview/FormReview";
import SkeletonLoading from "../../Components/SkeletonLoading/SkeletonLoading";


const Home = () => {
  let [emptyState, setEmptyState] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const dogsisterAsync = async () => {
      try {
        const { data } = await axios.get("https://backendpawbnb-production.up.railway.app/sitters");
        const dogSittersNotNull = data.filter(dogSitter => dogSitter.neighborhood != null && dogSitter.deleted === false);
        dispatch(addDogsister(dogSittersNotNull));
        setEmptyState(false);
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }

    const reviewAsync = async () => {
      try {
        const { data } = await axios.get(`https://backendpawbnb-production.up.railway.app/review`);
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
        {/* componente del Formulario de review, utiizar solo para probar comentarios
        <FormReview dogSitterId='89b9f63e-903f-42b9-a0c8-868f0178c351' 
        ownerId='1705e93d-2837-465b-a03f-c01603930ca4'/> */}
        <Filter/>
        {emptyState?
          <SkeletonLoading/>
          :
          <Cards/>
        }
      </div >
    </div>
  );
};

export default Home;

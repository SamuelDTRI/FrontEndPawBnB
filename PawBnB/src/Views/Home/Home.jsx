import React from "react";
import Cards from "../../Components/Cards/Cards";
import { useEffect } from "react";
import { addDogsister } from "../../redux/dogsisterSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ContainerHome } from "./home.style";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dogsisterAsync = async() => {
      try {
        const { data } = await axios.get('http://localhost:3000/sitters');
        dispatch(addDogsister(data));
      } catch (error) {
        console.error('Error fetching dogsisters:', error);
      }
    }

    dogsisterAsync();
  },[])

  return(
    <ContainerHome>
      <Cards/>
    </ContainerHome>
  );
};

export default Home;

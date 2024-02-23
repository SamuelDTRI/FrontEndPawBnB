/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Panel.module.css"
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../redux/adminUsersSlice";
import { Barrios } from "../../../Helpers/Barrios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, defaults } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register( ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Panel = ()=>{
    const dispatch = useDispatch();
    //importamos el estado que guarda la lista de usuarios
    const usersList = useSelector((state)=>state.adminUsers.usersList)
    const ownersList = useSelector((state) => state.adminUsers.owners);
    const sittersList = useSelector((state) => state.adminUsers.sitters);

    //generamos las lista al cargar el componente
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);


    //Funciones para definir los barrios con mas cuidadores
    const neighborhoodCount = {};

    // Contar cuidadores por barrio
    usersList.forEach((user) => {
        const { neighborhood, role } = user;
        if (role === "DogSitter") {//se podría usar sittersList también
                if (neighborhoodCount[neighborhood]) {
                neighborhoodCount[neighborhood]++;
            } else {
            neighborhoodCount[neighborhood] = 1;
            }
        }
    });
    // Convertir objeto en array de pares clave-valor
    const neighborhoodArray = Object.entries(neighborhoodCount);
    // Ordenar array por valor (cantidad de cuidadores) de forma descendente
    neighborhoodArray.sort((a, b) => b[1] - a[1]);
    // Tomar los primeros cinco elementos del array
    const topFiveNeighborhoods = neighborhoodArray.slice(0, 5);
    
    //Funciones para buscar los barrios sin cuidador
    //Creamos un set en base al listado Barrios
    const allNeighborhoodsSet = new Set(Barrios.map((barrio) => barrio));
    //Ahora comparamos el set creado con la lista de usuarios y borramos los barrios que tienen cuidadores
    usersList.forEach((user) => {
      const { neighborhood, role } = user;
      if (role === "DogSitter") {
        allNeighborhoodsSet.delete(neighborhood);
      }
    });
    //Por ultimo convertimos al set en un arreglo
    const neighborhoodsWithoutSitters = Array.from(allNeighborhoodsSet);
    
    //Configuración de los datos para el gráfico de torta que representa el total de usuarios registrados
    const usersPieChart = {
      labels: ["Clientes", "Cuidadores"],
      datasets: [
        {
          label: " # ",
          data: [ownersList.length, sittersList.length],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const optionsPieChart ={};
    //Configuración de los datos para el gráfico de barras que representa los 5 barrios con mas cuidadores
    const topFiveNeighborhoodsChart = {
      labels: topFiveNeighborhoods.map((neighborhood) => neighborhood[0]),
      datasets: [
        {
          label: "Cuidadores",
          data: topFiveNeighborhoods.map((neighborhood) => neighborhood[1]),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    const optionsBarChart = {responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Barrios com más cuidadores registrados.',
    },
  },};
    return (
      <div>
        <h3 className={styles.title}>Usuarios :</h3>
        <hr />
        <div className={styles.flexContainer}>
          <div>
            <div>
              <p>
                Total de usuarios registrado: <span>{usersList.length}</span>
              </p>
              <p>
                Cuidadores: <span>{sittersList.length}</span>
              </p>
              <p>
                Clientes: <span>{ownersList.length}</span>
              </p>
            </div>
            <div>
                <Pie data={usersPieChart} options={optionsPieChart}></Pie>
            </div>
          </div>
          <div>
            <div>
              <p>Barrios con mas Cuidadores:</p>
              <ol>
                {topFiveNeighborhoods.map((neighborhood, index) => {
                  return (
                    <li
                    key={
                      index
                    }>{`${neighborhood[0]}: ${neighborhood[1]} cuidadores.`}</li>
                    );
                  })}
              </ol>
              <div>
                <Bar data={topFiveNeighborhoodsChart} options={optionsBarChart}></Bar>
              </div>
            </div>
          </div>
          <div>
            <p>Barrios sin Cuidadores:</p>
            <ul className={styles.neighborhoodList}>
              {neighborhoodsWithoutSitters.map((neighborhood, index) => (
                <li key={index}>{neighborhood}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Panel;
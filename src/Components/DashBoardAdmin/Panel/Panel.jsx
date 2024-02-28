/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Panel.module.css"
import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../redux/adminUsersSlice";
import { Barrios } from "../../../Helpers/Barrios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, defaults } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

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
        if (role === "DogSitter" && neighborhood !== null) {//se podría usar sittersList también
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
      labels: [],
      datasets: [
        {
          label: " # ",
          data: [ownersList.length, sittersList.length],
          backgroundColor: ["#FFA726", "#7B61FF"],
          borderColor: ["#ed9615", "#6447f7"],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    };
    const optionsPieChart ={
      plugins: {
        datalabels: {
          display: false,
        }
      }
    };
    //Configuración de los datos para el gráfico de barras que representa los 5 barrios con mas cuidadores
    const topFiveNeighborhoodsChart = {
      labels: topFiveNeighborhoods.map((neighborhood) => neighborhood[0]),
      datasets: [
        {
          data: topFiveNeighborhoods.map((neighborhood) => neighborhood[1]),
          backgroundColor: "#7B61FF",
          borderColor:  "#6447f7",
          borderWidth: 2,
          hoverOffset: 2,
        },
      ],
    };
    const optionsBarChart = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grace: "20%",
          type: "linear",
          ticks: {
            stepSize: 0,
          },
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          // position: 'top',
        },
        datalabels: {
          display: true,
          color: "black",
          align: "end",
          anchor: "end",
          font: { size: "14" },
        },
        title: {
          display: false,
        },
      },
    };
    return (
      <div className={styles.container}>
        <div className={styles.dataContainer}>
          <div className={styles.chartCard}>
            <h3 className={styles.title}>Usuarios Registrados</h3>
            {ownersList.length > 0 || sittersList.length > 0 ? (
              <div className={styles.pieChartData}>
                <div className={styles.pieChartTotal}>
                  <p className={styles.usersTotalTitle}>Total</p>
                  <p className={styles.usersNumber}>{usersList.length}</p>
                </div>
                <div>
                  <p
                    className={`d-flex align-items-center ${styles.pieChartLabel}`}>
                    <span className={`${styles.labelColor}`}></span>
                    <span className={`me-auto ${styles.labelText}`}>
                      Dueños
                    </span>{" "}
                    <span className={`ms-auto ${styles.labelNumber}`}>
                      {sittersList.length}
                    </span>
                  </p>
                  <p
                    className={`d-flex align-items-center ${styles.pieChartLabel}`}>
                    <span
                      className={`${styles.labelColor} ${styles.labelColorTwo}`}></span>
                    <span className={`me-auto ${styles.labelText}`}>
                      Cuidadores
                    </span>{" "}
                    <span className={`ms-auto ${styles.labelNumber}`}>
                      {ownersList.length}
                    </span>
                  </p>
                </div>
                <div className={styles.pieChartGraph}>
                  <Pie data={usersPieChart} options={optionsPieChart}></Pie>
                </div>
              </div>
            ) : (
              <div className={styles.dataErrorMessage}>
                <h4>Lo sentimos,no hay datos para mostrar.</h4>
              </div>
            )}
          </div>
          <div className={styles.chartCard}>
            <h3 className={styles.title}>Barrios con mas Cuidadores:</h3>
            {/* <ol>
            {topFiveNeighborhoods.map((neighborhood, index) => {
              return (
                <li
                  key={
                    index
                  }>{`${neighborhood[0]}: ${neighborhood[1]} cuidadores.`}</li>
              );
            })}
            </ol> */}
            <div className={styles.barChartGraph}>
              {sittersList.length > 0 ? (
                <Bar
                  data={topFiveNeighborhoodsChart}
                  options={optionsBarChart}></Bar>
              ) : (
                <div className={styles.dataErrorMessage}>
                  <h4>Lo sentimos,no hay datos para mostrar.</h4>
                </div>
              )}
            </div>
          </div>
          <div className={styles.chartCard}>
            <h3 className={styles.title}>Barrios sin Cuidadores</h3>
            {sittersList.length > 0 ? (
              <ul className={styles.neighborhoodList}>
                <div className={styles.listsColumns}>
                  {neighborhoodsWithoutSitters.map((neighborhood, index) => (
                    <li key={index}>{neighborhood}</li>
                  ))}
                </div>
              </ul>
            ) : (
              <div className={styles.dataErrorMessage}>
                <h4>Lo sentimos,no hay datos para mostrar.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Panel;
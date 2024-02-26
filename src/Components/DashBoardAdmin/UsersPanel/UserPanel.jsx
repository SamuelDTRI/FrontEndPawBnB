/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, sortUsersByName, sortUsersByLastName,filterUsersByRole, filterUsersByNeighborhood } from "../../../redux/adminUsersSlice.js";
import styles from "./UserPanel.module.css";
import { Barrios } from "../../../Helpers/Barrios.js";
import axios from "axios";
import { Link } from "react-router-dom";

const rolesOptions = ["Owner", "DogSitter"];

const roleLabels = {
  Owner: "Cliente",
  DogSitter: "Cuidador",
};
const deletedUserStyle = {
  backgroundColor: "lightgray",
  // Otros estilos para resaltar usuarios eliminados
};
const UsersPanel = () => {
  //definición de dispatch y del estado combinedlist
  const dispatch = useDispatch();
  // Estados que se usa para definir el filtrado y los ordenamientos
  const filteredUsers = useSelector((state) => state.adminUsers.filteredUsers);
  const [sortOrderName, setSortOrderName] = useState("asc");
  const [sortOrderLastName, setSortOrderLastName] = useState("asc");
  //Estados para hacer funcionar los filtros
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const barrios = Barrios;
  const [currentPage, setCurrentPage] = useState(1);
  //Estado para realizar la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  //Función que maneja el paginado
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1)
  };
  const searchedUsers = filteredUsers.filter((user) => {
    const fullName = `${user.name} ${user.surName}`.toLowerCase();
    const normalizedSearchTerm = searchTerm
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const normalizedFullName = fullName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(normalizedSearchTerm, "i");
    return regex.test(normalizedFullName);
  });
  // Estados y constantes relacionado al paginado
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(searchedUsers.length / usersPerPage);
  // Traemos del server las listar de owners y sitters
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  //Función para realizar el borrado lógico de un usuario
  const handleDelete = async (userId, role) => {
    try {
      // Determinar la URL de la solicitud DELETE según el rol del usuario
      let deleteUrl;
      if (role === "Owner") {
        deleteUrl = `http://localhost:3000/owners/delete/${userId}`;
      } else if (role === "DogSitter") {
        deleteUrl = `http://localhost:3000/sitters/delete/${userId}`;
      } else {
        console.error("Rol de usuario no válido:", role);
        return;
      }

      // Enviar una solicitud DELETE al servidor para realizar el borrado lógico
      await axios.put(deleteUrl, { deleted: true });
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error al procesar la solicitud de borrado lógico:", error);
    }
  };
  // Funciones para cambiar de pagina
  const nextHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //funciones que manejan los ordenamientos
  const toggleSortOrderName = () => {
    const newOrder = sortOrderName === "asc" ? "desc" : "asc";
    setSortOrderName(newOrder);
    dispatch(sortUsersByName(newOrder));
  };

  const toggleOrderLastName = () => {
    const newOrder = sortOrderLastName === "asc" ? "desc" : "asc";
    setSortOrderLastName(newOrder);
    dispatch(sortUsersByLastName(newOrder));
  };

  // Funciones que manejas el filtrado
  const handleFilter = (option, filterType) => {
    if (filterType === "filterByRole") {
      dispatch(filterUsersByRole(option));
    } else {
      dispatch(filterUsersByNeighborhood(option));
    }
    setSortOrderName("asc");
    setSortOrderLastName("asc");
  };

  const handleOptionChange = (event) => {
    const filterType = event.target.getAttribute("name");

    if (filterType === "filterByRole") {
      handleFilter(event.target.value, filterType);
      setSelectedRole(event.target.value);
      if (event.target.value === "all") {
        setSelectedNeighborhood("all");
      }
    } else {
      handleFilter(event.target.value);
      setSelectedNeighborhood(event.target.value, filterType);
      if (event.target.value === "all") {
        setSelectedRole("all");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o apellido"
        />
      </div>
      {/* Listado de usuarios */}
      <div className={styles.tableContainer}>
        <table className={`table`}>
          <thead>
            <tr>
              <th>
                <span>#</span>
              </th>
              <th>
                <span>Nombre</span>
              </th>
              <th>
                <span>Apellido</span>
              </th>
              <th>Email</th>
              <th>Rol</th>
              <th>Barrio</th>
              <th>Acciones</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <button
                  className={styles.sortingButton}
                  onClick={() => toggleSortOrderName()}>
                  {sortOrderName === "asc" ? "↓" : "↑"}
                </button>
              </th>
              <th>
                <button
                  className={styles.sortingButton}
                  onClick={() => toggleOrderLastName()}>
                  {sortOrderLastName === "asc" ? "↓" : "↑"}
                </button>
              </th>
              <th>---</th>
              <th>
                <select
                  name="filterByRole"
                  id="roleFilter"
                  value={selectedRole}
                  onChange={handleOptionChange}>
                  <option value="all">Todos</option>
                  {rolesOptions.map((role, index) => {
                    const hasUsersInRole = filteredUsers.some((user) => {
                      return user.role && user.role.includes(role);
                    });
                    const style = hasUsersInRole ? {} : { display: "none" };

                    return (
                      <option key={index} value={role} style={style}>
                        {roleLabels[role]}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th>
                <select
                  name="filterByNeighborhood"
                  id="roleFilter"
                  value={selectedNeighborhood}
                  onChange={handleOptionChange}>
                  <option value="all">Todos</option>
                  {barrios.map((barrio, index) => {
                    // Filtrar la lista de usuarios para ver si hay al menos un usuario en este barrio
                    const hasUsersInBarrio = filteredUsers.some((user) => {
                      return (
                        user.neighborhood && user.neighborhood.includes(barrio)
                      );
                    });
                    // Si no hay usuarios en este barrio, oculta la opción
                    const style = hasUsersInBarrio ? {} : { display: "none" };
                    return (
                      <option key={index} value={barrio} style={style}>
                        {barrio}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th>---</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapea los usuarios y renderiza cada fila */}
            {currentUsers.map((user, index) => (
              <tr key={user.id} className={styles.deletedUser}>
                <td>{indexOfFirstUser + index + 1}</td>
                <td>
                  <Link
                    to={`/dashboardAdmin/users/profile/${user.role}/${user.id}`}>
                    {user.name ? user.name : "--"}
                  </Link>
                </td>
                <td>{user.surName ? user.surName : "--"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.neighborhood ? user.neighborhood : "--"}</td>
                <td>
                  {/* Botón para el borrado lógico */}
                  <button
                    onClick={() => handleDelete(user.id, user.role)}
                    disabled={user.deleted}
                    style={user.deleted ? deletedUserStyle : null}>
                    Suspender
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Botones para paginación */}
      <div className={styles.paginationContainer}>
        {totalPages > 1 && (
          <div className={styles.paginationBtn}>
            <button
              className={currentPage > 1 ? styles.btnNav : styles.btnNone}
              onClick={() => prevHandler()}>
              &lt; Anterior
            </button>
            <div className={styles.paginationPag}>
              <span className={styles.pag}>{currentPage}</span>
              <span>de {totalPages}</span>
            </div>
            <button
              className={
                currentPage < totalPages ? styles.btnNav : styles.btnNone
              }
              onClick={() => nextHandler()}>
              Siguiente &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPanel;

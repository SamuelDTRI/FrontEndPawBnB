import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSitters, fetchOwners, sortUsersByName, sortUsersByLastName, filterUsersByRole } from "../../../redux/adminUsersSlice.js";
import styles from "./UserPanel.module.css";

const rolesOptions = ["Owner", "DogSitter"];

const roleLabels = {
  Owner: "Cliente",
  DogSitter: "Cuidador",
};
const UsersPanel = () => {
  //definición de dispatch y del estado combinedlist
  const dispatch = useDispatch();
  // Estados que se usa para definir el filtrado y los ordenamientos
  const filteredUsers = useSelector((state) => state.adminUsers.filteredUsers);
  const [sortOrderName, setSortOrderName] = useState("asc");
  const [sortOrderLastName, setSortOrderLastName]= useState("asc");
  console.log(filteredUsers)
  //Estados para hacer funcionar los filtros
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectecNeighborhood, setSelectedNeighborhood] = useState("all");
  // Estados y constantes relacionado al paginado
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  // Traemos del server las listar de owners y sitters
  useEffect(() => {
    dispatch(fetchSitters());
    dispatch(fetchOwners());
  }, [dispatch]);

//   useEffect(()=>{
//     console.log("hola")
//     dispatch(initialList(combinedList))
//   },[])
console.log(filteredUsers)
  // Función para realizar el borrado lógico de un usuario
//   const handleDelete = (userId) => {
//     // Realiza el borrado lógico del usuario con el ID proporcionado
//     // Actualiza el estado de los usuarios
//   };


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
    console.log(newOrder);
    setSortOrderName(newOrder);
    dispatch(sortUsersByName(newOrder));
  };

  const toggleOrderLastName = () => {
    const newOrder = sortOrderLastName === "asc" ? "desc" : "asc";
    setSortOrderLastName(newOrder);
     dispatch(sortUsersByLastName(newOrder));
  };

// Funciones que manejas el filtrado
  const handleFilter = (option) => {
    if (option === "Owner" || option === "DogSitter") {
      dispatch(filterUsersByRole(option));
    } else {
    //   dispatch(filterByNeighborHood(option));
    }
    setSortOrderName("asc");
    setSortOrderLastName("asc");
  };

// const handleOptionChange = (event) => {
//   const filterType = event.target.getAttribute("name");

//   if (filterType === "filterByRole") {
//     console.log(event.target.value);
//     handleFilter(event.target.value);
//     setSelectedRole(event.target.value);
//     if (event.target.value === "all") {
//       setSelectedNeighborhood("all");
//     }
//   } else {
//     handleFilter(event.target.value);
//     setSelectedNeighborhood(event.target.value);
//     if (event.target.value === "all") {
//       setSelectedRole("all");
//     }
//   }
// };

  return (
    <div>
      {/* Listado de usuarios */}
      <table className="table">
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
                // onChange={handleOptionChange}
                >
                <option value="all">Todos</option>
                {rolesOptions.map((role) => (
                  <option key={role} value={role}>
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
            </th>
            <th>---</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapea los usuarios y renderiza cada fila */}
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.surName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.neighborhood ? user.neighborhood : "--"}</td>
              <td>
                {/* Botón para el borrado lógico */}
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones para paginación */}
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
  );
};

export default UsersPanel;

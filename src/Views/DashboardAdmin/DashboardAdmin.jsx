import styles from "./DashboardAdmin.module.css";
import { useLocation } from "react-router";
import SideBarPanel from "../../Components/DashBoardAdmin/SideBarPanel/SideBarPanel";
import UsersPanel from "../../Components/DashBoardAdmin/UsersPanel/UserPanel";
import Panel from "../../Components/DashBoardAdmin/Panel/Panel";

const DashboardAdmin = () => {
  const location = useLocation();

  return (
    <div className="container my-1 ">
      <div className="column">
        <div className={`col-md-12 col-sm-12 ${styles.sideBarContainer}`}>
          <div className="column">
            <h3>Admin Name</h3>
          </div>
          <hr />
          <SideBarPanel />
        </div>
        <div
          className={`col-md-12 col-sm-12 ms-3 ms-sm-4 sm-my-3 ${styles.panelContainer}`}>
          {location.pathname === "/dashboardAdmin" && <Panel />}
          {location.pathname === "/dashboardAdmin/users" && <UsersPanel />}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

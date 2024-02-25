import styles from "./DashboardAdmin.module.css";
import { useLocation } from "react-router";
import SideBarPanel from "../../Components/DashBoardAdmin/SideBarPanel/SideBarPanel";
import UsersPanel from "../../Components/DashBoardAdmin/UsersPanel/UserPanel";
import Panel from "../../Components/DashBoardAdmin/Panel/Panel";
import UserProfile from "../../Components/DashBoardAdmin/UserProfile/UserProfile";

const DashboardAdmin = () => {
  const location = useLocation();
  const isUserProfileRoute =/^\/dashboardAdmin\/users\/profile\/\w+\/[\w-]+$/.test(location.pathname);

  return (
    <div className="container my-1">
      <div className="column">
        <div className={`col-md-12 col-sm-12 ${styles.sideBarContainer}`}>
          <SideBarPanel />
        </div>
        <div className={`col-md-12 col-sm-12 my-4 ${styles.panelContainer}`}>
          {location.pathname === "/dashboardAdmin" && <Panel />}
          {location.pathname === "/dashboardAdmin/users" && <UsersPanel />}
          {isUserProfileRoute && <UserProfile />}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

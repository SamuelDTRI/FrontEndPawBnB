import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SideBarPanel.module.css";

const SideBarPanel = () => {
    const adminInfo = useSelector((state)=> state.adminUsers.adminInfo);
    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.adminInfoContainer}>
                <div className={styles.adminName}>
                    <h4>{adminInfo.name}</h4>
                    <h5 className={styles.adminTitle}>ADMIN</h5>
                </div>
            </div>
            <div className={`${styles.sideBarLinks}`}>
                <ul className={styles.linksContainer}>
                    <li>
                        <NavLink to="/dashboardAdmin">
                            <i className="bi bi-menu-button-wide"></i> Vista General
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboardAdmin/users">
                            <i className="bi bi-people"></i> Usuarios
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarPanel;

import { Link } from "react-router-dom";
import styles from "./SideBarPanel.module.css";

const SideBarPanel = () => {
    return (
        <div className={`${styles.sideBarLinks}`}>
            <ul>
                <li>
                    <Link to="/dashboardAdmin">
                        <i className="bi bi-menu-button-wide"></i> Vista General
                    </Link>
                </li>
                <li>
                    <Link to="/dashboardAdmin/users">
                        <i className="bi bi-people"></i> Usuarios
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBarPanel;

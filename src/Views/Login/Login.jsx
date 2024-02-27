import LoginForm from "../../Components/Login/LoginForm.jsx";
import styles from "./Login.module.css"

const Login = () => {
  return (
    <div className={styles.loginFormContainer}>
    <LoginForm/>
    </div>
  )
};

export default Login;

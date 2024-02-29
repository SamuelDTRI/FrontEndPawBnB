import LoginForm from "../../Components/Login/LoginForm.jsx";
import styles from "./Login.module.css"

const Login = () => {
  return (
    <>
    <div className={styles.loginFormContainer}>
    <LoginForm/>
    </div>
    {/* <div classname= {styles.containerImage}>
      <img src="https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330244/PawBnb/log-in-dog-min_tbfeqz.png" alt="PerritoLogin" />
    </div> */}
    </>
  )
};

export default Login;

import Formulario from "../../Helpers/Formulario";

import styles from "./SignUpOwners.module.css";

const SignUpOwners = () => {
  
      return (
        <>
        <div className={styles.signUPFormContainer}>
          <Formulario text= 'REGÍSTRATE' role = "Owner"/>
        </div>
        {/* <div classname= {styles.containerImage}>
        <img src="https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330244/PawBnb/log-in-dog-min_tbfeqz.png" alt="PerritoLogin" />
        </div>   */}
        
        </>
      )
};

export default SignUpOwners;

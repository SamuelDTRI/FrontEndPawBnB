import Formulario from "../../Helpers/Formulario";

import styles from "./SignUpOwners.module.css";

const SignUpOwners = () => {
  
      return (
        <div className={styles.signUPFormContainer}>
          <Formulario text= 'REGÍSTRATE' role = "Owner"/>
        </div>
      )
};

export default SignUpOwners;

import Formulario from "../../Helpers/Formulario";
import styles from "./SignUpSitters.module.css"

const SignUpSitters = () => {
  return (
    <div className={styles.signUPFormContainer}>
      <Formulario text= 'REGISTRATE COMO CUIDADOR' role= "DogSitter"/>
    </div>
    
  )
};

export default SignUpSitters;

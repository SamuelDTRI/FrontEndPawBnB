import Formulario from "../../Helpers/Formulario";
import styles from "./SignUpSitters.module.css"

const SignUpSitters = () => {
  return (
    <>
    <div className={styles.signUPFormContainer}>
      <Formulario text= 'REGISTRATE COMO CUIDADOR' role= "DogSitter"/>
    </div>
    {/* <div classname= {styles.containerImage}>
    <img src="https://res.cloudinary.com/dtyqmfqi2/image/upload/v1707330244/PawBnb/log-in-dog-min_tbfeqz.png" alt="PerritoLogin" />
  </div> */}
    
    </>
  )
};

export default SignUpSitters;

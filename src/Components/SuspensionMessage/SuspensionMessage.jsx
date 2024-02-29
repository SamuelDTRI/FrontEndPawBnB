import styles from './SuspensionMessage.module.css';
const SuspensionMessage = () => {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.imageMessageContainer}>
          <img
            src="https://www.shutterstock.com/image-vector/sad-sitting-puppy-dog-cartoon-600nw-2181296051.jpg"
            alt="Perro triste"
          />
        </div>
        <h3 >Tu cuenta a sido suspendida, contáctate con nosotros para recibir más informacion.</h3>
      </div>
    );

};

export default SuspensionMessage;
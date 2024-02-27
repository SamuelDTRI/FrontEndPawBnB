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
        <h3 >Lo sentimos, pero no tienes permiso para ver este contenido.</h3>
      </div>
    );

};

export default SuspensionMessage;
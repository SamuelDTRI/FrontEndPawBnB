import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./LandingPage.module.css"
import BoxerPhoto from "../imagenes/boxerLanding/charly-main-section.png";
import SextionDividerPhoto from "../imagenes/section-divider/section-divider.png"
import computerDogPhoto from "../imagenes/computer-dog/computer-dog.jpg"
import viajaTranquiloPhoto from "../imagenes/viajaTranquilo/viajaTranquilo.jpg"
import BackgroundImage from "../imagenes/background-image/bgimage-1.png" 
import promesaPawbnb from "../imagenes/promesa-pawbnb/promesa-pawbnb.jpg"
import conveniencia from "../imagenes/conveniencia/convenince-pic.jpg"
import soportePersonasReales from "../imagenes/soporte-personas-reales/help-center.jpg"
import cuidadoresConfianza from "../imagenes/cuidadoresConfianza/cuidadoresDeConfianza..jpg"
import dogPhoto from "../imagenes//programaMeet/dogdog.jpg"
import SearchBar from "../SearchBar/SearchBar";

const LandingPage=()=>{
    return(
        <div>
            <NavBar/>
            <div className={style.contenedorPincipal}>
               
               <div className={"conteiner mt-5 custom-margin"}>
                <div className="row">
                    <div className="col-12 col-md-6 p-2">
                        <div className={style.titulo}>
                            RESERVA UN CUIDADOR DE CONFIANZA CERCA DE TI
                        </div>
                        <div className={style.subtitulo}>
                        No más jaulas, perreras, gruñidos o aullidos.
                        Permitanos brindarle la hospitalidad que se merece a través de nuestra red nacional
                        de cuidadores! 
                        </div>    
                        <div className={style.contenedorInputs}>
                           <SearchBar/> 
                        </div>
                    </div> 
                                    
                    <div className="col-12 col-md-6 ">
                         <img src={BoxerPhoto} alt="perrito" className={style.imagenBoxer}/> 
                        </div>
                    </div>            
               </div>          
        </div>
        <div className={style.sectionDivider}>
        <img src={SextionDividerPhoto} alt="sectionDivider" className={style.imagenDivisora}/>
        </div>

        <div>    
            <div className={style.texto}>
                  <div className={style.titulo2}>EXPERIMENTA LA MAGIA DE PAWBNB</div>
                  <div className={style.subtitulo2}>
                 Es facil y conveniente reservar su proximo cuidador, quien ha sido examinado minusiosamente 
                  y esta respaldado por nuestra promesa de PAWBNB en reservas
                  </div>
            </div>
           </div>  
       
       <div className="container">
          <div className="row">
             <div className="col-4 position-relative ">
                  <div className={style.contenedorNro}><p className={style.numero}>1</p></div>
                  <div className={style.photos}><img src={computerDogPhoto} alt="computerDog" className={style.computerDogPhoto}/></div>
                  <div className={style.conteinerObj}>
                    <div className={style.conteinerText}>
                        <p className={style.text}>BUSCAR Y RESERVAR</p>
                        <p className={style.text}>Cada cuidador es examinaod minuciosamente y se 
                         verifica sus antecedentes
                         </p>
                        </div>
                  </div>
             </div>
             
             
             <div className="col-4 position-relative">
             <div className={style.contenedorNro}><p className={style.numero}>2</p></div>
                  <div className={style.photos}><img src={dogPhoto} alt="viajaTranquilo" className={style.computerDogPhoto}/></div>
                  <div className={style.conteinerObj}>
                    <div className={style.conteinerText}>
                        <p className={style.text}>PROGRAMA TU MEET AND GREET GRATIS</p>
                        <p className={style.text}>El cuidador se reunira contigo y tu perro para asegurarse
                        de ser el cuidador iddeal</p>
                        </div>
                  </div>
             </div>
             
             
             
             <div className="col-4 position-relative">
             <div className={style.contenedorNro}><p className={style.numero}>3</p></div>
                  <div className={style.photos}><img src={viajaTranquiloPhoto} alt="viajaTranquilo" className={style.computerDogPhoto}/></div>
                  <div className={style.conteinerObj}>
                    <div className={style.conteinerText}>
                        <p className={style.text}>VIAJA CON TRANQUILIDAD</p>
                        <p className={style.text}>Recibiras actualizaciones periodicas, incluyendo
                        muchas fotos!</p>
                        </div>
                  </div>
             </div>
          </div>
       </div>

        <div className={style.ContBtReservaCuidador}><button>RESERVA TU CUIDADOR</button></div>
        {/* <Footer/> */}
        
        <div className={style.sectionDivider}
             ><img className={style.imagenDivisora} src={SextionDividerPhoto} alt="hola" />
        </div>   

        <div className={style.texto}><p className={style.titulo2}>POR QUE ELEGIR PAWBNB?</p></div> 

        <div className={`container ${style.contenedorPpal}`}>
            <div className="row">

                <div className={`col-12 col-md-6 col-lg-3 h-100 ${style.cardContainer}`}>
                      <div className={style.contenedorImgn}>
                         <img className={style.imagenIndividual}src={cuidadoresConfianza} alt="promesPawbnb"/>     
                      </div>
                     <div className={style.textoo2}>
                         <p className={style.text}>CUIDADORES DE CONFIANZA</p>
                         <p className={style.text}>La seguridad y el bienestar de tu perro son el centro de lo que hacemos </p>
                     </div>
                </div>

                <div className={`col-12 col-md-6 col-lg-3 h-100 ${style.cardContainer}`}>
                      <div className={style.contenedorImgn}>
                         <img className={style.imagenIndividual}src={promesaPawbnb} alt="promesPawbnb"/>     
                      </div>
                     <div className={style.textoo2}>
                         <p className={style.text}>PROMESA PAWBNB</p>
                         <p className={style.text}>Las reservas tienen una garantia de satisfaccion del 100%</p>
                     </div>
                </div>

                <div className={`col-12 col-md-6 col-lg-3 h-100 ${style.cardContainer}`}>
                      <div className={style.contenedorImgn}>
                         <img className={style.imagenIndividual}src={conveniencia} alt="promesPawbnb"/>     
                      </div>
                     <div className={style.textoo2}>
                         <p className={style.text}>CONVENIENCIA</p>
                         <p className={style.text}>Las tarifas de nuestros cuidadores son todo incluido </p>
                     </div>
                </div>


                <div className={`col-12 col-md-6 col-lg-3 h-100 ${style.cardContainer}`}>
                      <div className={style.contenedorImgn}>
                         <img className={style.imagenIndividual}src={soportePersonasReales} alt="promesPawbnb"/>     
                      </div>
                     <div className={style.textoo2}>
                         <p className={style.text}>SOPORTE DE PERSONAS REALES</p>
                         <p className={style.text}>El soporte de PAWBNB esta a tu servicio 24/7  </p>
                     </div>
                </div>   
             
            </div>
        </div>

</div>
    )
}

export default LandingPage;
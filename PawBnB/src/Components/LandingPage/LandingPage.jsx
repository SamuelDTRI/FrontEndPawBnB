import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from "./LandingPage.module.css"
import BoxerPhoto from "../imagenes/boxerLanding/charly-main-section.png";

const LandingPage=()=>{
    return(
        <div>
            <NavBar/>
            <div className={style.contenedorPincipal}>
               
               <div className={"conteiner mt-5 custom-margin"}>
                <div className="row">
                    <div className="col-12 col-md-6 p-2">
                        <div className={style.titulo}>
                            RESREVA UN CUIDADOR DE CONFIANZA CERCA DE TI
                        </div>
                        <div className={style.subtitulo}>
                        No más jaulas, perreras, gruñidos o aullidos.
                        Permitanos brindarle la hospitalidad que se merece a través de nuestra red nacional
                        de cuidadores! 
                        </div>    
                        <div className="">
                            <input type="text" className={style.input} placeholder="Codigo postal"></input>
                            <input type="text" className={style.input} placeholder="Agregar fechas"></input>
                            <button className={style.boton}>Buscar</button>
                        </div>
                    </div> 
                
                    <div className="col-12 col-md-6">
                        <img src={BoxerPhoto} alt="perrito" className={style.imagenBoxer}/>
                        </div>
                    </div>        
                        

                    
               </div>
             
             <Footer/>
        </div>
        </div>
    )
}

export default LandingPage;
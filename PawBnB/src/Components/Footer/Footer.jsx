import React from "react";

const Footer = () => {
  return(
   <div className='card-group'>
    <div div className=" card text-center mb-3 bg-warning">
      <div className="card-body">
        <h3 className="card-title mb-3">Cuidadores locales</h3>
        <p className="card-subtitle mb-2 text-body-secondary">Belgrano</p>
        <p className="card-subtitle mb-2 text-body-secondary">Palermo</p>
        <p className="card-subtitle mb-2 text-body-secondary">San Isidro</p>
        <p className="card-subtitle mb-2 text-body-secondary">Recoleta</p>
        <p className="card-subtitle mb-2 text-body-secondary">Puerto Madero</p>
        <p className="card-subtitle mb-2 text-body-secondary">Nuñez</p>
        <p className="card-subtitle mb-2 text-body-secondary">Caballito</p>
    </div>
    </div>

     <div className="card text-center mb-3 bg-warning">
       <div className="card-body">
        <h3 className="card-title mb-3">Aprende mas</h3>
        <p className="card-link">Como funciona PawBnb</p>
        <p className="card-link">Tarifas de cuidadores locales</p>
        <p className="card-link">Por que elegir PawBnb</p>
        <p className="card-link">Pawbnb reviews</p>
        <h3 className="card-title mb-3">Podemos ayudarte</h3>
        <p className="card-link">Ayuda y FAQ</p>
       </div>
    </div>

    <div div className="card text-center mb-3 bg-warning">
       <div className="card-body">
         <h3 className="card-title mb-3">Conviertete en cuidador</h3>
         <p className="card-text">Se tu propio jefe. Ajusta tus tarifas y horarios. Conoceras perros asombrosos cerca tuyo</p>
         <button className="btn btn-light text-black mb-3 border-black">Hazte cuidador</button>
         <h3 className="card-title mb-3">Contactanos</h3>
      <p>Buenos Aires, Argentina</p>
    <button className="btn btn-light text-black border-black">Hablemos</button>

    </div>
    </div>
    
    
   </div>);
};

export default Footer;

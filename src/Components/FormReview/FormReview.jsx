import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ContainerFormReview } from "./formReview.styled";

const FormReview = ({dogSitterId, ownerId}) => {

    const [formData, setFormData] = useState({
        dogSitterId: dogSitterId,
        ownerId: ownerId,
        rating: '',
        comment: '',
    });

    // desabilita boton de enviar
    const [btnDisable, setBtnDisable] = useState(true);

    //btn de enviar
    const sendBtn = document.getElementById('sendBtn');

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/review', formData);

            // Restablecer los valores de los inputs después del envío exitoso
            setFormData({
                dogSitterId: '',
                ownerId: '',
                rating: '',
                comment: '',
            });

            setBtnDisable(true);
            document.getElementById('sendBtn').style.backgroundColor = '#ffa72640';
            document.getElementById('sendBtn').style.cursor = 'default';

        } catch (error) {
            console.log('error al cargar comentario', error);
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        let newFormData = {
            ...formData,
            [name]: value
        };
    
        if (value.length > 255) {
            newFormData[name] = value.slice(0, 255);
        }
    
        // Verificar si la longitud del comentario alcanzó el límite y deshabilitar la entrada si es necesario
        if (newFormData.comment.length === 255) {
            event.target.setAttribute('readonly', true);
        }
    
        setFormData(newFormData);
    
        // Verificar si ambos campos están llenos y habilitar el botón de enviar
        if(newFormData.comment.length > 0 && newFormData.rating.length > 0){
            setBtnDisable(false);
            document.getElementById('sendBtn').style.backgroundColor = '#ffa726';
            document.getElementById('sendBtn').style.cursor = 'pointer';
        } else {
            setBtnDisable(true);
            document.getElementById('sendBtn').style.backgroundColor = '#ffa72640';
            document.getElementById('sendBtn').style.cursor = 'default';
        }
    };

    return(
        <ContainerFormReview>
            <div className="title">
                <h2>CUÉNTANOS TU EXPERIENCIA</h2>
            </div>
            <div className="rating-box">
                <p className="rating-title">Puntuación</p>
                <div className="rating">
                    <div className="rating-select">
                        <input onChange={handleChange} type="radio" id="star5" name="rating" value="5"/>
                        <label htmlFor="star5"></label>
                        <input onChange={handleChange} type="radio" id="star4" name="rating" value="4"/>
                        <label htmlFor="star4"></label>
                        <input onChange={handleChange} type="radio" id="star3" name="rating" value="3"/>
                        <label htmlFor="star3"></label>
                        <input onChange={handleChange} type="radio" id="star2" name="rating" value="2"/>
                        <label htmlFor="star2"></label>
                        <input onChange={handleChange} type="radio" id="star1" name="rating" value="1"/>
                        <label htmlFor="star1"></label>
                    </div>
                </div>
            </div>
            <div className="comment-box">
                <p className="comment-title">Comentarios</p>
                <textarea id="textarea" required autoFocus placeholder="Deja aqui tu comentario" name="comment" value={formData.comment} onChange={handleChange} className="textarea"></textarea>
                <div className="count">
                    <p>{formData.comment.length}/255</p>
                </div>
            </div>
            <div className="btn-send">
                <button disabled={btnDisable} className="send" id="sendBtn" onClick={handleSubmit}>Enviar</button>
            </div>
        </ContainerFormReview>
    )
}

export default FormReview;

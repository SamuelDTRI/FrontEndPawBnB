import styled from 'styled-components';

export const ContainerFormReview = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #ccc;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #ccc;

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px;
    border: 1px solid #ffc300;
    box-shadow: 1px 1px 10px rgba(128, 128, 128, 0.295);
    padding: 3% 5%;
    width: 80%;
    height: 500px;
    background-color: #FFFFFF;
    z-index: 5;

    .title{
        font-weight:bold;
    }
    
    .rating-box{

        .rating-title{
            font-weight:bold;
        }

        .rating{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #F4F4F4;
            border-radius: 15px;
            width: 390px;
        
            .rating-select {
                display: inline-block;
                opacity: 1;


                input {
                    display: none;
                    opacity: 1;
                }

                label {
                    float: right;
                    cursor: pointer;
                    color: #ccc;
                    transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
                }

                label:before {
                    content: '★';
                    font-size: 30px;
                    transition: color 0.3s;
                    margin: 0px 2px;
                }
            }
        }

        .rating input:checked ~ label,
        .rating label:hover,
        .rating label:hover ~ label {
            color: #FFA726;
            transform: scale(1.2);
            transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
            animation: bounce 0.3s ease-in-out alternate;
        }
    }
        @keyframes bounce {
            to {
                transform: scale(1.3);
            }
        }
    }

    .comment-box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .comment-title{
            font-weight:bold;
        }
        
        .textarea{
            background-color: #F4F4F4;
            border: none;
            appearance: none;
            color: #959595;
            border-radius: 15px;
            padding: 10px 20px;
            width: 390px;
            height: 150px;
            resize: none;
            outline: 0;
        }
        .count{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 370px;
            color: #959595;
            
            p{
                margin: 0;
                font-size: 0.8em;
            }
        }
    }

    .send{
        width: 390px;
        background-color: #ffa72640;
        cursor: default;
    }
    .send:hover{
        border-color: none;
        box-shadow: none;
    }
    
`
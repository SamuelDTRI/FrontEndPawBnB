import styled from 'styled-components';

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 230px;
    max-width: 290px;
    height: 450px;
    border-radius: 15px;
    box-shadow: 1px 1px 10px rgba(128, 128, 128, 0.295);

    .imgContainer{
        width: 100%;
        height: 55%;
        position: relative;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;

        img{
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            height: 100%;
            width: 100%;
            background-position: center top;
            background-size: cover;
            margin: 0;
        };
    }

    .infoContainer{
        display: flex;
        height: auto;
        justify-content: space-between;
        flex-direction: column;
        padding: 0 10px 17px 10px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;


        .infoName{
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p{
                font-size: 1.2em;
                margin: 0;
                font-weight: bold;
            }
        }
        .infoReview{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            column-gap: 7px;
            font-size: 1.2em;

            .star{
                color: #FAAF19;
            }
            .review{

            }
            p{
                margin: 0;
            }
        }
        .infoBtn{
            margin-top: 5px;

            button{
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .btnBooking{
                width: 100%;
                margin-bottom: 10px;
                background-color: #FAAF19;
                color: #ffffff;
            }
            .btnProfile{
                width: 100%;
                background-color: #ffffff;
                color: #FAAF19;
                box-shadow: 1px 1px 10px rgba(128, 128, 128, 0.295);
            }
        }
    }
`
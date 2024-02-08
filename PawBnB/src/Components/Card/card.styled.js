import styled from 'styled-components';

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 450px;
    border-radius: 10px;
    box-shadow: 3px 5px 14px 3px rgba(0,0,0,0.5);
    -webkit-box-shadow: 3px 5px 14px 3px rgba(0,0,0,0.5);
    -moz-box-shadow: 3px 5px 14px 3px rgba(0,0,0,0.5);

    .imgContainer{
        width: 100%;
        height: 55%;
        position: relative;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

        img{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            height: 100%;
            width: 100%;
            background-position: center top;
            background-size: cover;
            margin: 0;
        };
    }

    .infoContainer{
        display: flex;
        flex-direction: column;
        row-gap: 7px;
        padding: 0 10px 20px 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;


        .infoName{
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p{
                font-family: 'Courier New', Courier, monospace;
                font-size: 1.5em;
                margin: 0;
                font-weight: bold;
            }
        }
        .infoReview{
            display: flex;
            align-items: flex-start;

            p{
                margin: 0;
            }
        }
        .infoBtn{

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
                -webkit-box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 15px -3px rgba(0,0,0,0.75);
            }
        }
    }
`
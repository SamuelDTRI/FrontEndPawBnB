import styled from 'styled-components';

export const ContainerCards = styled.div`
    min-height: 80vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction:column;
    gap: 20px;
    padding: 2% 5%;

    .title-order{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        column-gap: 10px;

        .title{

        }
    }

    .cards{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction:row;
        flex-wrap:wrap;
        gap: 20px 20px;
        width: 100%;
        height: 100%;
    }

    .empty{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 50vh;
        width: 100%;

        .dogSad{
            width: auto;
            height: 50%;

            img{
                width: 100%;
                height: 100%;
            }
        }

        h3{
            color: #FAAF19;
        }
    }
`
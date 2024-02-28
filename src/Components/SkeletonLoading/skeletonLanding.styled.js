import styled from 'styled-components';

export const ContainerSkeletonLanding = styled.div`
    min-height: 80vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-direction:column;
    gap: 20px;
    padding: 2% 5%;

    .cards{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction:row;
        flex-wrap:wrap;
        gap: 20px 20px;
        width: 100%;
        height: 100%;
    

        .card {
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex-grow: 1;
            width: 230px;
            max-width: 290px;
            height: 450px;
            border-radius: 15px;
            padding-bottom: 17px;
               

            .card__title_name {
                height: 28px;
                width: 70px;
                margin-top: 0;
                margin: 0 10px;
            }
            .card__title_price {
                height: 28px;
                width: 90px;
                margin: 0 10px;
            }
            .card__title_city {
                height: 28px;
                width: 160px;
                margin: 0 10px;
            }
            .card__title_rating {
                height: 28px;
                width: 140px;
                margin: 0 10px;
            }
            .card__title_btn {
                height: 28px;
                width: 91%;
                margin: 0 10px;
            }
        
        }

        .card__skeleton {
            background-image: linear-gradient(
                    90deg,
                    #ccc 0px,
                    rgb(229 229 229 / 90%) 40px,
                    #ccc 80px
                );
            background-size: 300%;
            background-position: 100% 0;
            border-radius: 15px;
            animation: shimmer 1.5s infinite;
        }

        .card__description {
            width: 100%;
            height: 55%;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
        }

        @keyframes shimmer {
            to {
                background-position: -100% 0;
            }
        }
    }
`
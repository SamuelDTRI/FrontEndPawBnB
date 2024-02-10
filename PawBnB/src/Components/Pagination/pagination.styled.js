import styled from 'styled-components';

export const ContainerPagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 30px 0;

    .pagination-btn{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 80%;
        min-width: 450px;
        max-width: 550px;

        .pagination-pag{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            border-radius: 45px;
            border: 2px solid #fff;
            background-color: #ffffff50;

            span{
                font-size: 25px;
                padding: 0 7px;
            }

            .pag{
                padding: 0em 0.4em;
                font-size: 25px;
                text-transform: uppercase;
                font-weight: 700;
                color: #000;
                background-color: #fff;
                border-radius: 45px;
                box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            }
        }

        .btn-nav {
            padding: 1em 1.5em;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            font-weight: 500;
            color: #000;
            background-color: #fff;
            border: none;
            border-radius: 45px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
            cursor: pointer;
            outline: none;
        }
    
        .btn-nav:hover {
            background-color: #FAAF19;
            box-shadow: 0px 15px 20px #FAAF1950;
            color: #fff;
            transform: translateY(-7px);
        }
    
        .btn-nav:active {
            transform: translateY(-1px);
        }

        .btn-none{
            padding: 1em 1.5em;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            font-weight: 500;
            color: #000;
            background-color: #ffffff40;
            border: none;
            border-radius: 45px;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
            cursor: default;
            outline: none;
        }
    }
`
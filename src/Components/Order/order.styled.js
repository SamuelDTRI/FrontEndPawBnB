import styled from 'styled-components';

export const ContainerOrder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    column-gap: 10px;
    background-color: #F4F4F4;
    color: #959595;
    border-radius: 15px;
    padding: 7px 12px;

    .text{
        display: flex;
        padding: 0 7px;
        column-gap: 5px;

        img{
            height: 18px;
            width: 18px;
            border-radius: 0;
        }
        p{
            margin: 0;
        }
    }

    .select{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .select-box{
            border: none;
            appearance: none;
            background-color: #FFFFFF;
            color: #959595;
            border-radius: 8px;
            width: 200px;
            padding-left: 7px;
            height: 30px;
        }

        .arrow{
            display: flex;
            width: 13px;
            height: 13px;
            right: 7px;
            position: absolute;

            img{
                width: 100%;
                height: 100%;
            }
        }
    }
`
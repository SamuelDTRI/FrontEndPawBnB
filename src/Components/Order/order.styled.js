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

        .bi-sort-alpha-down{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFA726;
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
            width: 220px;
            padding-left: 7px;
            height: 30px;
            border: 0px solid #ffa726;
            outline: 0;

            option{
                background-color: #FFFFFF;
                text-align: left;
            }
        }

        .arrow{
            display: flex;
            width: 13px;
            height: 13px;
            right: 7px;
            position: absolute;

            .bi-caret-down-fill{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #FFA726;
            }
        }
    }
`
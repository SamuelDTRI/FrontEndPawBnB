import styled from 'styled-components';

export const ContainerFilter = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: center;
   box-shadow: 1px 1px 10px rgba(128, 128, 128, 0.295);
   border-radius: 15px;
   padding: 15px 25px;
   max-width: 80%;


   .filter-title{
      font-size: 1.4em;
      color: #FFA726;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      span{
         margin-left: 5px;
      }
   }

   .filters{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 15px;

      .filter{
         background-color: #F4F4F4;
         color: #959595;
         border-radius: 15px;
         padding: 7px 12px;
         gap: 7px 7px;
      }

      .filter-city{
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;

         .city-title{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .bi-map{
               display: flex;
               align-items: center;
               justify-content: center;
               color: #FFA726;
            }

            .bi-star{
               display: flex;
               align-items: center;
               justify-content: center;
               color: #FFA726;
            }

            .city-ubi{
               margin: 0;
               margin-left: 5px;
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
               width: 140px;
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
      }

      .filter-rates{
         display: flex;
         flex-direction: column;
         justify-content: center;
         justify-content: space-evenly;

         .rates-title{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .bi-currency-dollar{
               display: flex;
               align-items: center;
               justify-content: center;
               color: #FFA726;
            }
         }

         .rates-inputs{
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-content: space-evenly;
            flex-wrap: wrap;
            gap: 7px;

            .input-rates{
               border-radius: 8px;
               background-color: #FFFFFF;
               color: #959595;
               width: 80px;
               border: none;
               padding-left: 5px;
               border: 0px solid red;
               outline: 0;
            }
            .btn-rates{
               background-color: #ffa72640;
               height: 30px;
               display: flex;
               justify-content: center;
               align-items: center;
               cursor: default;
            }
            .btn-rates:hover{
               border-color: transparent;
               box-shadow: none;
            }
         }
         .btn-rates-rest{
            background-color: #ffa72640;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: default;
         }
         .btn-rates-rest:hover{
            border-color: transparent;
            box-shadow: none;
         }
      }
   }
`
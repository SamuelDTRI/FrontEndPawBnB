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

      img{
         height: 18px;
         width: 18px;
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

            img{
               height: 18px;
               width: 18px;
            }
            .city-ubi{
               margin: 0;
               margin-left: 5px;
            }
         }


         .select-box{
            border: none;
            appearance: none;
            background-color: #FFFFFF;
            color: #959595;
            border-radius: 8px;
            width: 80px;
            padding-left: 5px;
            height: 30px;
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

            img{
               height: 18px;
               width: 18px;
               margin: 0;
            }
         }

         .rates-inputs{
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-content: space-evenly;
            gap: 7px;

            .input-rates{
               border-radius: 8px;
               background-color: #FFFFFF;
               color: #959595;
               width: 80px;
               border: none;
               padding-left: 5px;
            }
            .btn-rates{
               height: 30px;
               display: flex;
               justify-content: center;
               align-items: center;
            }
         }
      }
   }
`
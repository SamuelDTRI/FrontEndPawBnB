import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogsisters: [],
  copyDogsisters: [],
  allReviews: [],
};

export const dogsisterSlice = createSlice({
  name: 'dogsister',
  initialState,
  reducers: {
    addDogsister: (state, action) => {
      state.copyDogsisters = action.payload;
      state.dogsisters = action.payload;
    },

    addAllReview: (state, action) => {
      state.allReviews = action.payload;
    },

    setFilters: (state, action) => {
      const { location, price, rating } = action.payload;
      let filteredDogSisters = state.copyDogsisters;

      if (location && location !== 'all') {
        // Filtrar las dogSisters basadas en la ubicación
        filteredDogSisters = filteredDogSisters.filter(dogSister => {
          if (location === 'Desconocidos') {
            // Si el usuario seleccionó 'Desconocidos', incluir los que tienen barrio null
            return dogSister.neighborhood === null;
          } else {
            // De lo contrario, incluir las dogSisters con el barrio seleccionado
            return dogSister.neighborhood === location;
          }
        });
      }
    
      if (price) {
        const { minRates, maxRates } = price;
        filteredDogSisters = filteredDogSisters.filter(dogsister => {
          if (dogsister.rates) {
            let rates = parseInt(dogsister.rates);
            return rates >= minRates && rates <= maxRates;
          }
          return false;
        });
      }

      if(rating) {

        const ratingCard = (id) => {
          // Filtra las revisiones que corresponden al id de la card
          const cardReviews = state.allReviews.filter(review => review.dogSitterId === id);
      
          let ratingSum = 0;//suma total
          let ratingAverage = 0;//promedio
          
          if(cardReviews.length > 0){
            
            const ratingArray = cardReviews.map((allReview) => {
              return ratingSum += +allReview?.rating;
            });
        
            /* ratingAverage = (ratingSum / ratingArray.length).toFixed(0); */
            ratingAverage = ratingSum / ratingArray.length;
            
          }
          
          return ratingAverage;
        }

        if (rating && rating !== 'all') {
          // Filtrar las dogSisters basadas en el rating promedio calculado
          filteredDogSisters = filteredDogSisters.filter(dogSister => {
            const sitterRating = ratingCard(dogSister.id); // Obtener el rating promedio del cuidador
            let sitterString = sitterRating.toString().charAt(0);
            return sitterString == rating;
          });
        }
      }
    
      state.dogsisters = filteredDogSisters;
    },

    setOrder: (state, action) => {
      let orderDogsister = state.dogsisters;

      switch(action.payload){
        case 'orderNameA':
              orderDogsister = orderDogsister.sort((a, b) => a.name.localeCompare(b.name));
              state.dogsisters = orderDogsister;
          break;

        case 'orderNameD':
              orderDogsister = orderDogsister.sort((a, b) => b.name.localeCompare(a.name));
              state.dogsisters = orderDogsister;
          break;

        case 'orderRatesA':
              orderDogsister = orderDogsister.sort((a, b) => a.rates - b.rates);
              state.dogsisters = orderDogsister;
          break;

        case 'orderRatesD':
          orderDogsister = orderDogsister.sort((a, b) => b.rates - a.rates);
          state.dogsisters = orderDogsister;
        break;

        default: state.dogsisters = state.dogsisters;

      }
    },
  },
});

export const { addDogsister, setFilters, setOrder, addAllReview } = dogsisterSlice.actions;
export default dogsisterSlice.reducer;

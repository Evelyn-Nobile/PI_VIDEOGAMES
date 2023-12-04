/* eslint-disable no-case-declarations */

import { GET_VIDEOGAMES, GET_DETAILS, CLEAR_DETAILS, GET_GENRES, GET_GAME_BY_NAME,POST_VIDEOGAME_SUCCESS, POST_VIDEOGAME_FAILURE,
   ORDER_ASC_DESC, ORDER_BY_RATING,FILTER_BY_GENRE, FILTER_BY_ORIGIN, CHANGE_PAGE, CLEAR_FILTERS} from "./action-types";
  
  const initialState = {
      allGames: [],
      allGamesCopy: [], 
      stateCopy: [],
      detail: [],
      genres: [],   
     selectedGenres: [], 
     selectedOrigin:'all',

     pagination: {     
      currentPage: 1,
      itemsPerPage: 15,
    },

    createdVideogame: {
      newVideogame: null,
      error: null
    }
    

  }
  
  
  const reducer = (state = initialState, {type, payload}) => {
      switch (type) {
  
        case GET_VIDEOGAMES:
          return {
            ...state,
            allGames: payload,
            allGamesCopy: payload,
            stateCopy:
              state.selectedGenres.length > 0
                ? payload.filter((game) => game.genres.some((genre) => state.selectedGenres.includes(genre))) //Actualizo la lista con los
                : payload,
          };
    
      
          case GET_GAME_BY_NAME:
            return {
                ...state,
                allGames: payload
            }

           
            case GET_DETAILS:
                return {
                  ...state,
                  detail: payload
               
                };

            case CLEAR_DETAILS:
                return {
                   ...state,
                   detail: []
                };  


                case GET_GENRES:
                  return {
                     ...state,
                   genres : payload
                      }        
         //order
         case ORDER_ASC_DESC:
          if (payload === "all") {
            return {
              ...state,
              allGames: state.allGamesCopy, 
            };
          }
    
          let videogamesNamesCopy = state.stateCopy ? [...state.stateCopy] : [...state.allGames];
          let sortedNames = payload === "asc" ? videogamesNamesCopy.sort((a, b) => a.name.localeCompare(b.name)) :
           videogamesNamesCopy.sort((a, b) => b.name.localeCompare(a.name));
    
          return {
            ...state,
            allGames: sortedNames,
          };
        
          
                case ORDER_BY_RATING:
                  if (payload === null) {
                    return {
                      ...state,
                      allGames: state.stateCopy, // Vuelve a la copia original sin filtro
                    };
                  }
                
                  let allGames = [...state.allGames];
                  let sortedRating = payload === "des"
                    ? allGames.sort((a, b) => a.rating - b.rating)
                    : allGames.sort((a, b) => b.rating - a.rating);
                
                  return {
                    ...state,
                   allGames: sortedRating,
                  };      

         //filters
         case FILTER_BY_GENRE:
          const selectedGenre = payload;
        
          if (selectedGenre === 'All') {
            return {
              ...state,
              selectedGenres: [],
              allGames: state.allGamesCopy,
              pagination: {
                ...state.pagination,
                currentPage: 1,
              },
            };
          }
        
          const updatedGenres = state.selectedGenres.includes(selectedGenre)
            ? state.selectedGenres.filter((genre) => genre !== selectedGenre)
            : [selectedGenre];
        
          const filteredGames = state.allGamesCopy.filter((game) => {
            if (updatedGenres.length === 0 || updatedGenres.includes('All')) {
              return true;
            }
            return game.genres.some((genre) => updatedGenres.includes(genre));
          });
        
          return {
            ...state,
            selectedGenres: updatedGenres,
            allGames: filteredGames,
            pagination: {
              ...state.pagination,
              currentPage: 1,
            },
          };
        

        


         case FILTER_BY_ORIGIN:        
      
        const filteredByGenre = state.selectedGenres.length > 0
        ? state.stateCopy.filter((game) => game.genres.some((genre) => state.selectedGenres.includes(genre)))
        : state.stateCopy;
    
      const filteredByOrigin = payload === 'created'
        ? filteredByGenre.filter((videogame) => videogame.createdInDB)
        : payload === 'api'
        ? filteredByGenre.filter((videogame) => !videogame.createdInDB)
        : filteredByGenre;
    
      return {
        ...state,
        allGames: payload === 'all' ? state.stateCopy : filteredByOrigin,
        selectedOrigin: payload,
        pagination: {
          ...state.pagination,
           currentPage: 1, 
        },
      };

          case CLEAR_FILTERS:
            const clearedState = {
              ...state,
              selectedGenres: [],
              allGames: state.allGamesCopy,
              pagination: {
                ...state.pagination,
                 currentPage: 1, 
              },
            };
          
            
          
            return  clearedState
            
          
          


       //paginado
       case CHANGE_PAGE:
        return {
          ...state,       
      pagination: {
            ...state.pagination,
            currentPage: payload,
          },
        };
     
     
      case POST_VIDEOGAME_SUCCESS:
        return {
          ...state,
          allGames: [...state.allGames, payload],
          createdVideogame: {
            newVideogame: payload,
            error: null,
          },
        };
      
   case POST_VIDEOGAME_FAILURE:
        return {
          ...state,

          createdVideogame:{
            newVideogame: null,  // Reiniciar el estado de nuevo videojuego en caso de fallo
            error: payload,
          }
         
        };
        
  default:
  return {...state}
      }
      
  }
  
  export default reducer;
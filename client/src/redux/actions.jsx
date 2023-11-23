import axios from 'axios'

 import { GET_VIDEOGAMES, GET_DETAILS, CLEAR_DETAILS, GET_GENRES, GET_GAME_BY_NAME, POST_VIDEOGAME_SUCCESS, POST_VIDEOGAME_FAILURE, ORDER_ASC_DESC, ORDER_BY_RATING,
      FILTER_BY_GENRE, FILTER_BY_ORIGIN, CHANGE_PAGE, CLEAR_FILTERS } from "./action-types";



     export const getVideogames = () => {
    
        return async (dispatch) => { //uso el dispatch para poder enviar la action
           try {
            const apiInfo = await axios("http://localhost:3001/videogames") 
    
            return dispatch({ 
              type: GET_VIDEOGAMES,
              payload: apiInfo.data 
             
           })

           } catch (error) {
            console.log(error.message);
            throw new Error(error.message);           
           }
        }
    }   


    export const getVideogameByName = (name) => {
  
        return async (dispatch) => {
            try {
                const apiInfo = await axios(`http://localhost:3001/videogames/search?name=${name}`)
               
                return dispatch({
                    type : GET_GAME_BY_NAME,
                    payload: apiInfo.data
                })
            } catch (error) {
              console.log(error.message);
              throw new Error(error.message);    
            }
        }
      }
      
    

      export const getGenres = () => {
    
        return async (dispatch) => {
           try {
            const apiInfo = await axios.get(`http://localhost:3001/genres`)
    
            return dispatch({
              type: GET_GENRES,
              payload: apiInfo.data
              
           })
    
           } catch (error) {
            console.log(error.message);
            throw new Error(error.message);    
           }
        }
    }


      
      export const getDetails = (id) => {
        return async (dispatch) => {
          try {
            const apiInfo = await axios.get(`http://localhost:3001/videogames/${id}`);
            
            
            const videogameDetails = apiInfo.data;
         
            return dispatch({

              type: GET_DETAILS,
              payload: videogameDetails,
            });

          } catch (error) {
            console.log(error.message);
            throw new Error(error.message);    
          }
        };
      };
      
      export const clearDetails = () => {
        return {
          type: CLEAR_DETAILS
        };
      };
      
  //orders
  export const orderAscAndDesc = (order) => {
    return { type: ORDER_ASC_DESC, payload: order };
  }

  export const orderByRating = (payload) => {
    return {
      type : ORDER_BY_RATING,  
       payload
    }
  }

//filters

export const filterByOrigin = (payload) =>{
  return {
    type: FILTER_BY_ORIGIN,
    payload
  }
    }

    export const filterByGenre = (genre) =>{
      return {
        type: FILTER_BY_GENRE,
        payload: genre
      }
      
      }

      export const clearFilters = () => {
        return async (dispatch, getState) => {
          try {
            dispatch({ type: CLEAR_FILTERS });
      
            const state = getState();
            const filteredGames = state.selectedGenres.length > 0
              ? state.allGames.filter((game) => game.genres.some((genre) => state.selectedGenres.includes(genre)))
              : state.allGames;
      
            dispatch({
              type: GET_VIDEOGAMES,
              payload: filteredGames,
            });
          } catch (error) {
            console.log(error.message);
            throw new Error(error.message);    
          }
        };
      };
      



    //paginado
    export const changePage = (page) => ({
      type: CHANGE_PAGE,
      payload: page,
    });

    export const postVideogame = (payload) => {
      return async function (dispatch) {
        try {
          const apiInfo = await axios.post(`http://localhost:3001/videogames/create`, payload);
    
          // Manejar la respuesta exitosa
          dispatch({
            type: POST_VIDEOGAME_SUCCESS,
            payload: apiInfo.data,
          });
    
          return apiInfo.data; 
    
        } catch (error) {
          
          console.error("Error al realizar la solicitud POST:", error.message);
    
     
          dispatch({
            type: POST_VIDEOGAME_FAILURE,
            payload: error.message,
          });
    
          throw error; 
        }
      };
    };
 
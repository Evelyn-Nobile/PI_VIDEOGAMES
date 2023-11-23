require('dotenv').config();
const {Videogame,Genre} = require ('../../../db')
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games'
const DEFAULT_IMAGE = 'https://img.freepik.com/fotos-premium/primer-plano-controlador-videojuego-sobre-fondo-amarillo-ai-generativo_974546-23442.jpg'

const getVideogameByIdController = async (id) => {
    try {
      
     
      if (id.includes("-")){
        const gameFromDB = await Videogame.findByPk( id,
           {include:[{ 
            model: Genre, 
            attributes: ["name"], 
            through: { attributes: []}
        }]
    })

      const { name, image, platforms, released, rating, genres, description, createdInDB } = gameFromDB.dataValues;
      
      const gameData = {
              id,
              name, 
              image,
              platforms,
              released, 
              rating, 
              genres: genres?.map((genre) => genre.name),
              description,
              createdInDB
          }
      
          return gameData
      }

     // Si no se encontró en la base de datos, busca en la API
      const response = await axios.get(`${URL}/${id}?key=${API_KEY}`)
      const apiData = response.data
      if (apiData) {
        // Formatea la respuesta de la API 
       
        const  mappedGame = {
          id: apiData.id,
          image: apiData.background_image?apiData.background_image: DEFAULT_IMAGE,
          name: apiData.name,
          rating: apiData.rating,
          released: apiData.released,
          description: apiData.description_raw,
          genres: apiData.genres?.map((genre) => genre.name) || [],
          platforms: apiData.platforms?.map((platform) => platform.platform.name) || [],
        };
        
  return mappedGame;
      }
    
  
    } catch (error) {
      console.error('Error during getVideogameByIdController:', error.message);
      return null;
    }
  };



module.exports = getVideogameByIdController
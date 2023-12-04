require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const { Videogame, Genre } = require('../../../db'); 
const DEFAULT_IMAGE = 'https://img.freepik.com/fotos-premium/primer-plano-controlador-videojuego-sobre-fondo-amarillo-ai-generativo_974546-23442.jpg'

const getVideogamesController = async () => {
  try {

    let i = 1;
    let games = [];
     
  
    while (i < 6) {
   
      const response = await axios.get(`${URL}?key=${API_KEY}&page=${i}`)
   
      const results = response.data.results;
      
    
      games.push(...results);

      i++;
    }
    
     //obtengo las propiedades que necesito y las guardo en un array 
  
    const gamesFromApi = 
       games.map((game) => ({
        id: game.id,
        image: game.background_image?game.background_image: DEFAULT_IMAGE,
        name: game.name,
        rating: game.rating,
        genres: game.genres?.map((genre) => genre.name) || [], 
        platforms: game.platforms?.map((platform) => platform.platform.name),  
                                                               
      }));
         

  // Busco los videojuegos de la base de datos
  const gamesFromDB = await Videogame.findAll({
         
    include:[{ 
        model: Genre,
        attributes: ["name"], 
        through: { attributes: []} 
    }]
});

const gamesFromDBFormatted = gamesFromDB.map((game) => ({
  id: game.id,
  image: game.image,
        name: game.name,
        rating: game.rating,     
        platforms:game.platforms,
  genres: game.genres?.map((genre) => genre.name) || [], // Convierte los objetos en un array de strings o establece un array vacío
  createdInDB: true
}));

const allVideogames = [...gamesFromDBFormatted, ...gamesFromApi];

return allVideogames;
  } 
 
  catch (error) {
    console.log(error.message);
    return [];
  }
};

module.exports = getVideogamesController;

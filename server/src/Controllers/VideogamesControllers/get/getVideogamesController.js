require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const { Videogame, Genre } = require('../../../db'); 
const DEFAULT_IMAGE = 'https://img.freepik.com/fotos-premium/primer-plano-controlador-videojuego-sobre-fondo-amarillo-ai-generativo_974546-23442.jpg'

const getVideogamesController = async () => {
  try {

    //Se inicializanipara rastrear la página de la API que se está consultando ygamespara almacenar los juegos.
    let i = 1;
    let games = [];
     
    //inicio un bucle while para obtener los resultados de 5 paginas
    while (i < 6) {
        //peticion a la api
      const response = await axios.get(`${URL}?key=${API_KEY}&page=${i}`)
      //Se accede a la propiedad results de la respuesta para obtener los datos de juegos de esa página específica.
      const results = response.data.results;
      
      //Los juegos obtenidos se agregan al arreglo games utilizando el operador spread ( ...) 
      //para combinar los juegos de diferentes páginas en un solo arreglo.
      games.push(...results);
      
      //i se incrementa para avanzar a la siguiente página en la siguiente iteración del bucle.
      //si no lo hago genero un bucle infinito
      i++;
    }
    
     //obtengo las propiedades que necesito y las guardo en un array 
     //Se utiliza el operador?.para evitar errores en caso de que genres o platforms sean nulos o indefinidos.
    const gamesFromApi = 
       games.map((game) => ({
        id: game.id,
        image: game.background_image?game.background_image: DEFAULT_IMAGE,
        name: game.name,
        rating: game.rating,
        genres: game.genres?.map((genre) => genre.name) || [], //genres es un array de obj con la prop name
        platforms: game.platforms?.map((platform) => platform.platform.name), //platforms es un array que dentro tiene un obj llamado 
                                                               //platform y dentro una propiedad name
      }));
         

  // Busco los videojuegos de la base de datos
  const gamesFromDB = await Videogame.findAll({
         
    include:[{ 
        model: Genre,//se está solicitando que se incluyan datos de la tabla Genre
        attributes: ["name"], // se le pide que solo incluya los atributos de la columna "name" de la tabla genre.
        through: { attributes: []} // Para que no seleccione atributos de la tabla intermedia, solo la relacion en si. 
        //La opción through se utiliza para indicar que no se deben incluir atributos adicionales de la tabla intermedia
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
  //Los errores se muestran en la consola, y la función devuelve un arreglo vacío en caso de error.
  catch (error) {
    console.log(error.message);
    return [];
  }
};

module.exports = getVideogamesController;

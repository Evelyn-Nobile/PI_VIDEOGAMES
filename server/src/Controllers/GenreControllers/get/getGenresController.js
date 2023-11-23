require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = 'https://api.rawg.io/api/genres'
const {Genre } = require('../../../db'); 



const getGenresController = async () =>{
try {
    // Verifica si existen géneros en la base de datos
    const existingGenres = await Genre.findAll();

// Si hay géneros en la base de datos, los devuelvo
    if (existingGenres.length > 0) {
        
        const genres = existingGenres.map(genre => genre.name);
       
        return genres;
      }
      else{
//busco en la api y los guardo en la DB
        const response = await axios.get(`${URL}?key=${API_KEY}`);

        const apiGenres = response.data.results.map(genre => genre.name);
    
    await Genre.bulkCreate(apiGenres.map(name => ({ name })));

        return apiGenres;
      }

    

} catch (error) {
    
    return null
}
}

module.exports = getGenresController
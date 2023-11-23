const { Videogame, Genre } = require('../../../db');
const { Op } = require('sequelize');

const putVideogameController = async (req) => {
  try {
    const { name } = req.params;
   
    const lowerCaseName = name.toLowerCase().trim()


    const { image, description, released, rating, genres, platforms } = req.body;
  

    // Verificar si el videojuego existe en la base de datos
    const existingGame = await Videogame.findOne({
      where: { name: { [Op.iLike]: lowerCaseName } } 
    });


    if (!existingGame) {
    
      throw new Error('Videogame not found');
    }

    // Actualizar con los datos enviados por body
    existingGame.image = image;
    existingGame.description = description;
    existingGame.released = released;   
    existingGame.rating = rating;
    existingGame.platforms = platforms;
// Verificar si se proporcionan géneros en la solicitud
if (genres && genres.length > 0) {
  // Realizar una búsqueda en la base de datos para encontrar los géneros correspondientes a los nombres proporcionados
  const genreRelations = await Genre.findAll({
    where: {
      name: {
        [Op.in]: genres, 
      },
    },
  });

 // Asociar los nuevos géneros al videojuego utilizando setGenres

  await existingGame.setGenres(genreRelations);

 

    //Guarda el objeto existingGame actualizado en la base de datos usando existingGame.save()
    await existingGame.save(); 

  }

  return existingGame;
  
  } catch (error) {
   console.log(error.message)
    return null;
  }
};

module.exports = putVideogameController;

const {Videogame,Genre} = require ('../../../db')
const { Op } = require('sequelize');


const postVideogameController = async (videogame) => { //recibo un obj videogame como parametro
  //Este objeto contiene información sobre el nuevo videojuego a ser agregado a la base de datos.

try {

    //Estos datos se utilizan para crear un nuevo videogame en la base de datos.
    let { name, image, description, released, rating, genres, platforms} = videogame;

      const requiredFields = ['name', 'image', 'description', 'released', 'rating', 'platforms'];
     const missingFields = requiredFields.filter(field => !videogame[field]);
 
     if (missingFields.length > 0) {
       throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
     }

      if (!genres || genres.length === 0) {
       throw new Error('The videogame must have at least one genre.');
     }
      rating = parseFloat(rating)
     if (isNaN(rating) || rating < 1 || rating > 5) {
       throw new Error('The rating must be a number between 1 and 5.');
    }
    

     const existingGame = await Videogame.findOne({
      
       where: {
         name,
       },
     });

     if (!existingGame) {
    const game = await Videogame.create({ 
        name,
        image,
        description,
        released,
        rating,
        platforms,
      });


      if (genres && genres.length > 0) {
        // Buscar los genres en la base de datos y se relacionan con el videogame
        const genreRelations = await Genre.findAll({          
          
          where: {
            name: {
              [Op.in]: genres, // Buscar generos cuyos nombres estén en la lista de genres
            },
          },
        });
  
        // Agregar los generos relacionados al videogame
        await game.addGenres(genreRelations);
      }
  console.log('Videogame created successfully')
  return { success: true, game }

    }

else{

    throw new Error ('The videogame already exists')
}

} catch (error) {
  return { success: false, error: error.message }
}


}

module.exports = postVideogameController
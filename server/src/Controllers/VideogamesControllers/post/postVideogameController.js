const {Videogame,Genre} = require ('../../../db')
const { Op } = require('sequelize');


const postVideogameController = async (videogame) => { //recibo un obj videogame como parametro
  //Este objeto contiene información sobre el nuevo videojuego a ser agregado a la base de datos.

try {

    //Estos datos se utilizan para crear un nuevo videogame en la base de datos.
    const { name, image, description, released, rating, genres, platforms} = videogame;
     // Verificar si ya existe un videojuego con el mismo nombre
   
     
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
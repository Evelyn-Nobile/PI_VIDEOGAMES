const { Videogame } = require('../../../db');
const { Op } = require('sequelize');

const deleteVideogameController = async (req) => {
  
  const { name } = req.params;

  const lowerCaseName = name.toLowerCase();

  try {
    //elimino el videogame con el nombre solicitado
    const result = await Videogame.destroy({
      
      where: { name: {
        [Op.iLike]: lowerCaseName,
      }}
  })

    if (!result) {
     
   
      throw new Error('Videogame not found');
    }

   

    return 'Videogame deleted successfully';
    
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = deleteVideogameController;

const deleteVideogameController = require('../../../Controllers/VideogamesControllers/delete/deleteVideogameController')



const deleteVideogameHandler = async (req, res) => {
    try {
      const result = await deleteVideogameController(req);
  
      if (!result) {
        throw new Error('Videogame not found');
      }
  
      return res.status(200).send(result);
      
    } catch (error) {

      if (error.message === 'Videogame not found') {
        return res.status(404).send('Videogame not found');
      }
      return res.status(500).send('Server error');
    }
  }

  module.exports = deleteVideogameHandler
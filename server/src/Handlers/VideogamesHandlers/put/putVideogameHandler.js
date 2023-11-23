const putVideogameController = require ('../../../Controllers/VideogamesControllers/put/putVideogameController')


const putVideogameHandler = async (req, res) => {
    try {
      const updatedGame = await putVideogameController(req);
  
      if (!updatedGame) {
        
        throw new Error('Videogame not found');
      }
  
      return res.status(200).json(updatedGame);
      
    } catch (error) {

      if (error.message === 'Videogame not found') {
        return res.status(404).send('Videogame not found');
      }

      return res.status(500).send('Server error');
    }
  };

  module.exports = putVideogameHandler
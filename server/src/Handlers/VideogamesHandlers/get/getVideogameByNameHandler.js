const getVideogameByNameController = require('../../../Controllers/VideogamesControllers/get/getVideogameByNameController');



const getVideogamesByNameHandler = async (req, res) =>{
    try {
        const { name } = req.query;
    
        const response = await getVideogameByNameController(name);
    
        if (!response) {
            return res.status(404).send(`We cannot find any game with the name: ${name}`);
          }
    
        return res.status(200).json(response);
      } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
      }
}

module.exports = getVideogamesByNameHandler
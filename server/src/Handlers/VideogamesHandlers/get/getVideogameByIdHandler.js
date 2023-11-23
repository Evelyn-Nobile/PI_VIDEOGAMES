const getVideogameByIdController = require ('../../../Controllers/VideogamesControllers/get/getVideogameByIdController.js')

const getVideogameByIdHandler = async ( req, res) => {

    const { id } = req.params; // Aquí obtienes el ID de los parámetros de la URL
    
   
    try {
            const response = await getVideogameByIdController(id);
            if (!response) {
                return res.status(404).send('Videogame not Found');
            }
            return res.status(200).json(response);
        } catch (error) {
            if (error.message === 'Videogame not Found') {
                return res.status(404).send({ error: error.message });
            }
            return res.status(500).send('Server error');
        }
};

module.exports = getVideogameByIdHandler
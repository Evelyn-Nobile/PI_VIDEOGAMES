const getGenresController = require('../../../Controllers/GenreControllers/get/getGenresController')


const getGenresHandler = async (req, res) =>{
    try {
        const response = await getGenresController()

     if(!response){
        throw new Error ('Can not find any genre')
     }
     
     return res.status(200).json(response)

    } catch (error) {
        if(error.message === 'Can not find any genre')
       return res.status(404).send({error: error.message})
    }

return res.status(500).send('Server error')
}


module.exports = getGenresHandler
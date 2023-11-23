const postVideogameController = require ('../../../Controllers/VideogamesControllers/post/postVideogameController')



const postVideogameHandler = async (req, res) => {
try {
    const videogame = {...req.body}
    const newGame = await postVideogameController(videogame)

    if(!newGame){
        throw new Error ('Sorry, we can not create the videogame')
    }

    return res.status(200).json(newGame)


} catch (error) {

    if(error === 'Sorry, we can not create the videogame')
    return res.status(500).json({Error:error.message})
}

}

module.exports = postVideogameHandler
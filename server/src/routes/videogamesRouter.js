const {Router} = require ('express')
const getVideogamesHandler = require('../Handlers/VideogamesHandlers/get/getVideogamesHandler')
const getVideogameByIdHandler = require('../Handlers/VideogamesHandlers/get/getVideogameByIdHandler')
const getVideogamesByNameHandler = require('../Handlers/VideogamesHandlers/get/getVideogameByNameHandler')
const postVideogameHandler = require('../Handlers/VideogamesHandlers/post/postVideogameHandler')
const putVideogameHandler = require ('../Handlers/VideogamesHandlers/put/putVideogameHandler')
const deleteVideogameHandler = require ('../Handlers/VideogamesHandlers/delete/deleteVideogameHandler')


const videogamesRouter = Router()


videogamesRouter.get("/", getVideogamesHandler)

videogamesRouter.get("/search", getVideogamesByNameHandler)

videogamesRouter.get("/:id", getVideogameByIdHandler)

videogamesRouter.post("/create", postVideogameHandler)

videogamesRouter.put("/update/:name", putVideogameHandler)

videogamesRouter.delete("/delete/:name", deleteVideogameHandler)

module.exports = videogamesRouter
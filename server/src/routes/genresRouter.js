const { Router } = require("express");
const getGenresHandler = require("../Handlers/GenreHandlers/get/getGenresHandler");

const genresRouter = Router();




genresRouter.get("/", getGenresHandler)


module.exports = genresRouter
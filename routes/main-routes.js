const route = require("express").Router();

route.get("/", (request, response) => response.render("index"));

module.exports = route;


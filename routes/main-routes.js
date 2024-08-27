const route = require("express").Router();

route.get("/", (request, response) => response.render("registro"));

route.get("/signup",(req,res)=>{
res.render("registro");
})

module.exports = route;


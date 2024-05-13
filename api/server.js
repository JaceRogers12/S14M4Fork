const express = require("express");
const recipesRoutes = require("./recipes/recipes-router.js");

const server = express();

server.use(express.json());
server.use("/api/recipes", recipesRoutes);

server.get("/", (req, res) => {
    res.status(200).send("Something works");
})

server.get("*", (req, res, next) => {
    next({status: 404, message: "There's nothing at the url you searched"})
})

server.use((err, req, res, next) => {
    console.log("There's been an error");
    res.status(err.status || 500)
        .send(err.message || "Looks like we've got trouble!")
})

module.exports = server;
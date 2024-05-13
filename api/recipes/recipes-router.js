const express = require("express");
const Recipes = require("./recipes-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    //await Recipes.get();
    try {
        res.status(200).send("We're brewing up some stuff for you, but you'll have to wait a sec")
    } catch(err) {
        next(err);
    }
})

module.exports = router;
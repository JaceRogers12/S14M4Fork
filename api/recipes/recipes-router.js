const express = require("express");
const Recipes = require("./recipes-model.js");

const router = express.Router();

router.getById("/", async (req, res, next) => {
    const recipe = await Recipes.find(req.params.id);
    try {
        res.status(200).send(recipe)
    } catch(err) {
        next(err);
    }
})

module.exports = router;
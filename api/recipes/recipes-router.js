const express = require("express");
const Recipes = require("./recipes-model.js");
const {
    checkId
} = require("./recipes-middleware.js");

const router = express.Router();

router.get("/:id", checkId, async (req, res, next) => {
    const recipe = await Recipes.findById(req.params.id);
    try {
        res.status(200).send(recipe)
    } catch(err) {
        next(err);
    }
})

module.exports = router;
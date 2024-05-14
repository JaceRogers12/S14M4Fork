const Recipes = require("./recipes-model.js");

async function checkId(req, res, next) {
    Recipes.validateId(req.params.id)
    .then(res => {
        next();
    })
    .catch(err => {
        next({status: 404, message: `There is no recipe by id ${req.params.id}`})
    })
}

module.exports = {
    checkId
}
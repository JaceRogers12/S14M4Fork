const db = require("../../data/db-config.js");

async function findById(id) {
    const data = await db("recipes as r")
        .join("steps as s", "s.recipe_id", "r.recipe_id")
        .join("recipes_ingredients as ri", "ri.recipe_id", "r.recipe_id")
        .join("ingredients as i", "ri.ingredient_id", "i.ingredient_id")
        .join("recipes_ingredients_quantities as riq",
            "r.recipe_id", "=", "riq.recipe_id",
            "and", "i.ingredient_id", "=", "riq.ingredient_id"
        )
        .join("quantities as q", "riq.quantity_id", "q.quantity_id")
        .select("recipe_name", "recipe_notes", "step_number", "step_instructions", "ingredient_name", "quantity")
        .where("r.recipe_id", id);

    return data;
}

/*
HOLDING AREA:
    const first = data[0];
    let rawIngredients = [];
    let rawQuantities = [];
    let rawSteps = [];
    let rawInstructions = [];
    data.forEach(record => {
        rawIngredients.push(record.ingredient_name);
        rawQuantities.push(record.quantity);
        rawSteps.push(record.step_number);
        rawInstructions.push(record.step_instructions);
    })
    let resultIngredients = [];
    let resultSteps = [];
    const result = {
        recipe: first.recipe_name,
        notes: first.recipe_notes,
        ingredients: resultIngredients,
        steps: resultSteps
    }
*/

async function validateId(id) {
    const selectedRecipe = await db("recipes as r")
        .select("recipe_name")
        .where("recipe_id", id);
    return selectedRecipe;
}

/*
SQL FOR FINDBYID:
select recipe_name, recipe_notes, step_number, step_instructions, ingredient_name, quantity
from recipes as r
join steps as s
    on s.recipe_id = r.recipe_id
join recipes_ingredients as ri
    on ri.recipe_id = r.recipe_id
join ingredients as i
    on ri.ingredient_id = i.ingredient_id
join recipes_ingredients_quantities as riq
    on r.recipe_id = riq.recipe_id and i.ingredient_id = riq.ingredient_id
join quantities as q
    on riq.quantity_id = q.quantity_id
where r.recipe_id = 1;
*/

module.exports = {
    findById,
    validateId
};
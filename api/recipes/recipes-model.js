const db = require("../../data/db-config.js");

async function findById(id) {
    const data = await db.raw(`select recipe_name, recipe_notes, step_number, step_instructions, ingredient_name, quantity
        from recipes as r
        join steps as s
            on s.recipe_id = r.recipe_id
        join recipes_ingredients as ri
            on ri.recipe_id = r.recipe_id
        join ingredients as i
            on ri.ingredient_id = i.ingredient_id
        join recipes_ingredients_quantities as riq
            on r.recipe_id = riq.recipe_id
            and i.ingredient_id = riq.ingredient_id
        join quantities as q
            on riq.quantity_id = q.quantity_id
        where r.recipe_id = ${id};`
    );

    const first = data[0];
    let resultIngredients = [];
    let resultSteps = [];
    data.forEach(record => {
        let recordIngredients = {
            ingredient: record.ingredient_name,
            quantity: record.quantity
        };
        let recordSteps = {
            step: record.step_number,
            instructions: record.step_instructions
        };
        let ingIncluded = resultIngredients.find(item => {
            return (item.ingredient == recordIngredients.ingredient
                && item.quantity == recordIngredients.quantity
            )
        })
        let stepIncluded = resultSteps.find(item => {
            return (item.step == recordSteps.step
                && item.instructions == recordSteps.instructions
            )
        })
        if (!ingIncluded) {
            resultIngredients.push(recordIngredients)
        }
        if (!stepIncluded) {
            resultSteps.push(recordSteps)
        }
    })

    const result = {
        recipe: first.recipe_name,
        notes: first.recipe_notes,
        ingredients: resultIngredients,
        steps: resultSteps
    }

    return result;
}

async function validateId(id) {
    const selectedRecipe = await db("recipes as r")
        .select("recipe_name")
        .where("recipe_id", id);
    return selectedRecipe;
}

module.exports = {
    findById,
    validateId
};

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
    on r.recipe_id = riq.recipe_id
    and i.ingredient_id = riq.ingredient_id
join quantities as q
    on riq.quantity_id = q.quantity_id
where r.recipe_id = 1;
*/

/*
MY BEST CONVERSION ATTEMPT FROM SQL TO KNEX - THE AND IN JOIN 4 WAS IGNORED
await db("recipes as r")
        .join("steps as s", "s.recipe_id", "r.recipe_id")
        .join("recipes_ingredients as ri", "ri.recipe_id", "r.recipe_id")
        .join("ingredients as i", "ri.ingredient_id", "i.ingredient_id")
        .join("recipes_ingredients_quantities as riq",
            "i.ingredient_id", "=", "riq.ingredient_id",
            "and", "r.recipe_id", "=", "riq.recipe_id",
        )
        .join("quantities as q", "riq.quantity_id", "q.quantity_id")
        .select("recipe_name", "recipe_notes", "step_number", "step_instructions", "ingredient_name", "quantity")
        .where("r.recipe_id", id);
*/
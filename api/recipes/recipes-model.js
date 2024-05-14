const db = require("../../data/db-config.js");

async function findById(id) {
    const result = await db("recipes")
        ;
    return result;
}

/*
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
    findById
};
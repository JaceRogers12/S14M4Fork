/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('ingredients_quantities').insert([
    {ingredient_id: 1, quantity_id: 2},
    {ingredient_id: 2, quantity_id: 1},
    {ingredient_id: 3, quantity_id: 1},
    {ingredient_id: 4, quantity_id: 3},
    {ingredient_id: 5, quantity_id: 5},
    {ingredient_id: 2, quantity_id: 4}
  ]);
};

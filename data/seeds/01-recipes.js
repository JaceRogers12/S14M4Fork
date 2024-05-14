/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('recipes').insert([
    {recipe_name: 'PBJ Samich', recipe_Notes: "Great for lunches on the go!"},
    {recipe_name: 'Ants on a Log'},
  ]);
};

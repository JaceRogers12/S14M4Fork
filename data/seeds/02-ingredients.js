/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('ingredients').insert([
    {ingredient_name: 'bread'},
    {ingredient_name: 'peanut butter'},
    {ingredient_name: 'jelly'},
    {ingredient_name: 'raisins'},
    {ingredient_name: 'celery'},
  ]);
};

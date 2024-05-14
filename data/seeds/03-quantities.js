/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('quantities').insert([
    {quantity: '2 tsp'},
    {quantity: '2 slices'},
    {quantity: '(as desired)'},
    {quantity: '1 tsp'},
    {quantity: '1 stalk'}
  ]);
};

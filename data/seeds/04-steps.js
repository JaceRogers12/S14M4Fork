/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('steps').insert([
    {step_number: 1, step_instructions: "Spread the peanut butter on one face of one of the slices of bread.", recipe_id: 1},
    {step_number: 2, step_instructions: "Spread the jelly on one face of the other slice of bread.", recipe_id: 1},
    {step_number: 3, step_instructions: "Put the two faces covered in spread together.", recipe_id: 1},
    {step_number: 1, step_instructions: "Spread the peanut butter along the celery's deep, central groove.", recipe_id: 2},
    {step_number: 2, step_instructions: "Press raisins into the peanut butter just firmly enough to make them stick. Do so in a spread out pattern.", recipe_id: 2}
  ]);
};

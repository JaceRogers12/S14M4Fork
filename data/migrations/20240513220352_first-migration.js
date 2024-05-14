/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.schema.createTable("recipes", tbl => {
    tbl.increments("recipe_id")
    tbl.string("recipe_name", 100)
        .unique()
        .notNullable()
    tbl.string("recipe_notes", 5000)
  })
  .createTable("ingredients", tbl => {
    tbl.increments("ingredient_id")
    tbl.string("ingredient_name", 100)
        .unique()
        .notNullable()
  })
  .createTable("quantities", tbl => {
    tbl.increments("quantity_id")
    tbl.string("quantity", 100)
        .unique()
        .notNullable()
  })
  .createTable("steps", tbl => {
    tbl.increments("step_id")
    tbl.integer("step_number")
        .unsigned()
        .notNullable()
    tbl.string("step_instructions", 5000)
        .notNullable()
    tbl.integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
  })
  .createTable("recipes_ingredients", tbl => {
    tbl.integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
    tbl.integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
    tbl.primary(["recipe_id", "ingredient_id"])
  })
  .createTable("ingredients_quantities", tbl => {
    tbl.integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
    tbl.integer("quantity_id")
        .unsigned()
        .notNullable()
        .references("quantity_id")
        .inTable("quantities")
    tbl.primary(["ingredient_id", "quantity_id"])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.schema.dropTableIfExists("ingredients_quantities")
    .dropTableIfExists("recipes_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("quantities")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes")
};

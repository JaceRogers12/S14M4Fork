const cleaner = require("knex-cleaner");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return await cleaner.clean(
    knex,
    {
      mode: "truncate",
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    }
  )
};

const db = require("../../data/db-config.js");

async function find() {
    const result = await db("recipes");
    return result;
}

module.exports = {
    find
};
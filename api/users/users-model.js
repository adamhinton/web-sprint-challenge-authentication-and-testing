const db = require("../../data/dbConfig");

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findBy(filter) {
  //this is untested
  return db("users").where(filter); // {username: "foo"}
}

module.exports = {
  add,
  findById,
  findBy,
};

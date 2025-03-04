const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY added DESC");
  return rows;
}

async function insertMessage(user, text) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [user, text]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};

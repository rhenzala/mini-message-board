require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (text, user) 
VALUES
  ('Hello from Koyeb!', 'Admin'),
  ('This message is persistent!', 'User')
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  

  try {
    await client.connect();
    console.log("Connected to DB");
    
    await client.query(SQL);
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Database error:", err);
  } finally {
    await client.end(); 
    console.log("Database connection closed");
  }
}

main();

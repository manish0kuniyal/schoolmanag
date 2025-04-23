const { Pool } = require('pg')
require ('dotenv').config()
// Comment out local configuration
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'nodejsAPI',
//   password: 'sql',
//   port: 5432,
// });

const pool = new Pool({
  connectionString:process.env.DB_url 
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('...Failed to connect to DB:', err.stack)
  }
  console.log('... Connected to  DB')

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `

  client.query(createTableQuery, (err, res) => {
    release()

    if (err) {
      return console.error('...table not created', err.stack)
    }
    console.log('...table created')
  });
});

module.exports = pool;

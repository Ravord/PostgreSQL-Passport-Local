const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DB_STRING,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
})
client.connect()
  .then(() => {
    console.log('Postgres is now running')
  })
  .catch((err) => {
    console.log(err)
  })
module.exports = client

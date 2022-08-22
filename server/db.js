require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

pool.connect()
  .then(() => console.log('PG DB Connected!'))
  .catch(err => console.error('PG DB connection error: ', err.stack))


module.exports = pool;
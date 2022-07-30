require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

pool
  .connect()
  .then(() => console.log('PG DB Connected!'))
  .catch(err => console.error('PG DB connection error: ', err.stack))

var questionQuery = () => {
  return pool.query(
    'SELECT q.id, q.body, q.date_written, q.asker_name, q.helpful, q.reported, an.id, an.body, an.date_written, an.answerer_name, an.helpful, ap.id, ap.url FROM questions q JOIN answers an ON q.id = an.question_id JOIN answers_photos ap ON an.id = ap.answer_id WHERE q.product_id = 66646 AND q.reported = false AND an.reported = false GROUP BY q.id, an.id, ap.id'
  )
}

module.exports = {
  pool,
  questionQuery
};
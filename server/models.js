const pool = require('./db.js');

module.exports = {

  questions: (query) => {
    let count = query.count || 5;
    let page = (count * query.page) || 0;
    // console.log('count: ', count);
    let product_id = query.product_id;
    return pool.query(`
      SELECT
      questions.id AS question_id,
      questions.body AS question_body,
      questions.asker_name,
      questions.helpful AS helpfulness,
      questions.reported,
      (
        SELECT json_object_agg(
          answers.id, json_build_object(
            'id', answers.id,
            'body', answers.body,
            'date', answers.date_written,
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.helpful,
            'photos', (SELECT json_agg(item)
              FROM (
              SELECT answers_photos.id,
              answers_photos.url
              FROM answers_photos
              WHERE answers_photos.answer_id = answers.id
              ) item
            )
          )
        )
        FROM answers
        WHERE answers.question_id = questions.id AND answers.reported = false
      ) AS answers
      FROM questions
      WHERE questions.product_id = ${product_id} AND questions.reported = false
      LIMIT ${count}
      OFFSET ${page};
    `)
  },

  answers: (query) => {
    let question_id = query.question_id;
    let count = query.count || 5;
    let page = (count * query.page) || 0;
    return pool.query(`
      SELECT
        answers.id AS id,
        answers.body AS body,
        answers.date_written AS date,
        answers.answerer_name,
        answers.helpful AS helpfulness,
        (
          SELECT json_agg(item)
          FROM (
            SELECT answers_photos.id,
            answers_photos.url
            FROM answers_photos
            WHERE answers_photos.answer_id = answers.id
          ) item
        ) AS photos
      FROM answers
      WHERE answers.question_id = ${question_id} AND answers.reported = false
      LIMIT ${count}
      OFFSET ${page};
    `)
  },

  insertQuestion: (data) => {
    // let product_id = data.product_id;
    // let body = JSON.stringify(data.body);
    // let name = data.name;
    // let email = data.email;
    return pool.query(`
      INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
      VALUES (${data.product_id}, '${data.body}', NOW(), '${data.name}', '${data.email}');
    `)
  },

  insertAnswer: (data) => {
    let question_id = data.question_id;
    let body = data.body;
    let name = data.name;
    let email = data.email;
    let photos = data.photos;
    return pool.query(`
      WITH data(question_id, body, date_written, answerer_name, answerer_email) AS (
        VALUES
          (${question_id}, '${body}', NOW(), '${name}', '${email}')
      ),
      ins AS(
        INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
        SELECT question_id, body, date_written, answerer_name, answerer_email
        FROM data
        RETURNING id AS answer_id
      )
      INSERT INTO answers_photos (answer_id, url)
      SELECT ins.answer_id, json_array_elements_text('{"urls":${photos}}'::JSON -> 'urls')
      FROM ins;
    `)
  },

  updateReported: (params) => {
    let id = params.id;
    let table = params.table
    return pool.query(`
      UPDATE ${table}
      SET reported = true
      WHERE ${table}.id = ${id};
    `)
  },

  updateHelpful: (params) => {
    // console.log('params: ', params)
    let id = params.id;
    let table = params.table
    return pool.query(`
      UPDATE ${table}
      SET helpful = helpful + 1
      WHERE ${table}.id = ${id};
    `)
  }

  // updateField: (params) => {
  //   let id = params.id;
  //   let table = params.table
  //   let field = params.field
  //   if (field === reported) {
  //     let setState = true;
  //   } else if (field === helpful) {
  //     let setState = helpful + 1;
  //   }
  //   return pool.query(`
  //     UPDATE ${table}
  //     SET ${field} = ${setState}
  //     WHERE ${table}.id = ${id};
  //   `)
  // }

}
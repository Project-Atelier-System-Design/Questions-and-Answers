DROP DATABASE IF EXISTS question_answer;

CREATE DATABASE question_answer;

\c question_answer;

 CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    body VARCHAR NOT NULL,
    date_written TEXT NOT NULL,
    asker_name VARCHAR NOT NULL,
    asker_email VARCHAR NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    helpful INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    body VARCHAR NOT NULL,
    date_written TEXT NOT NULL,
    answerer_name VARCHAR NOT NULL,
    answerer_email VARCHAR NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    helpful INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(question_id)
        REFERENCES questions(id)
  );

  CREATE TABLE answers_photos(
    id SERIAL PRIMARY KEY,
    answer_id INTEGER NOT NULL,
    url VARCHAR NOT NULL,
      FOREIGN KEY(answer_id)
        REFERENCES answers(id)
  );

-- Import commands for relevant data --

  copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/questions.csv'
    DELIMITER ','
    CSV HEADER;

  copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/answers.csv'
    DELIMITER ','
    CSV HEADER;

  copy answers_photos(id, answer_id, url)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/answers_photos.csv'
    DELIMITER ','
    CSV HEADER;

-- Reset serialization on Questions and Answers tables

SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);

SELECT setval(pg_get_serial_sequence('answers', 'id'), (SELECT MAX(id) FROM answers)+1);

SELECT setval(pg_get_serial_sequence('answers_photos', 'id'), (SELECT MAX(id) FROM answers_photos)+1);

-- Create indexes for foreign keys --

--CREATE INDEX questions_index ON questions ({product_id});--

CREATE INDEX answers_index ON answers (question_id);

CREATE INDEX answers_photos_index ON answers_photos (answer_id);
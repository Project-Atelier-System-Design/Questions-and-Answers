DROP DATABASE IF EXISTS question_answer;

CREATE DATABASE question_answer;

\c question_answer;

 CREATE TABLE questions(
    id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    body VARCHAR NOT NULL,
    date_written TEXT NOT NULL,
    asker_name VARCHAR NOT NULL,
    asker_email VARCHAR NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    helpful INTEGER NOT NULL
  );

  CREATE TABLE answers(
    id INTEGER PRIMARY KEY,
    question_id INTEGER NOT NULL,
    body VARCHAR NOT NULL,
    date_written TEXT NOT NULL,
    answerer_name VARCHAR NOT NULL,
    answerer_email VARCHAR NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT false,
    helpful INTEGER NOT NULL,
      FOREIGN KEY(question_id)
        REFERENCES questions(id)
  );

  CREATE TABLE answers_photos(
    id INTEGER PRIMARY KEY,
    answer_id INTEGER NOT NULL,
    url VARCHAR NOT NULL,
      FOREIGN KEY(answer_id)
        REFERENCES answers(id)
  );

-- Import commands for relevant data --

-- \set localpath `pwd`'/data_exports/questions.csv'
  copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/questions.csv'
    DELIMITER ','
    CSV HEADER;

-- \set localpath `pwd`'/data_exports/answers.csv'
  copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/answers.csv'
    DELIMITER ','
    CSV HEADER;

-- \set localpath `pwd`'/data_exports/answers_photos.csv'
  copy answers_photos(id, answer_id, url)
    FROM '/home/awallace87/hackreactor/Questions-and-Answers/data_exports/answers_photos.csv'
    DELIMITER ','
    CSV HEADER;

  --  data_exports/answers_photos.csv
  --  /home/awallace87/hackreactor/Questions-and-Answers/data_exports/answers_photos.csv
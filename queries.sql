----- THESE QUERIES WORK -----

--GET Answers --

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
WHERE answers.id < 100 AND answers.reported = false;

------- GET Questions -----

SELECT
questions.product_id,
(
	SELECT json_agg(item)
	FROM(
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
				) AS answers
				FROM answers
				WHERE answers.question_id = questions.id AND answers.reported = false
			)
		) item
	) AS results
FROM questions
WHERE questions.product_id = 66646 AND questions.reported = false;

------- POST questions/answers -----------

INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
VALUES (66646, 'whats even going on here?', NOW(), 'AMW Rootbeer', 'rootbeer@someemail.com');

SELECT * FROM questions WHERE questions.product_id = 66646;

------- PUT questions/answers ------------

UPDATE questions
SET reported = true
WHERE questions.id = 5

UPDATE questions
SET helpful = helpful + 1
WHERE questions.id = 5;

INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
VALUES (66646, 'whats even going on here?', NOW(), 'AMW Rootbeer', 'rootbeer@someemail.com');

SELECT MAX(questions.id) FROM questions;
SELECT nextval(pg_get_serial_sequence('questions', 'id'));

SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions)+1);
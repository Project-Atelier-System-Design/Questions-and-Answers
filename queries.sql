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


--insert answer with photo(array of urls) --

WITH data(question_id, body, date_written, answerer_name, answerer_email) AS (
	VALUES
		(456, 'Theres nothing to see here. V3', NOW(), 'AMW Rootbeer', 'rootbeer@someemail.com')
),
ins AS(
INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
SELECT question_id, body, date_written, answerer_name, answerer_email
FROM data
RETURNING id AS answer_id
)
INSERT INTO answers_photos (answer_id, url)
SELECT ins.answer_id, json_array_elements_text('{"urls":["https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
"https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q="]}'::JSON -> 'urls')
FROM ins
RETURNING *
;
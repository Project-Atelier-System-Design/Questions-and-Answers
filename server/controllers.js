const Models = require("./models.js");

module.exports = {

  getQuestions: function(req, res) {
    Models.questions(req.query)
      .then(data => {
        var response = {
          product_id: req.query.product_id,
          results: [data.rows]
        }
        res.status(200).send(response)
      })
      .catch(err => res.status(500).send(err.stack))
  },

  getAnswers: function(req, res) {
    const query = {
      question_id: (req.url).split('/')[3],
      page: req.query.page,
      count: req.query.count
    }
    Models.answers(query)
      .then(data => {
        var response = {
          question: query.question_id,
          page: req.query.page || 0,
          count: req.query.count || 5,
          results: [data.rows]
        }
        res.status(200).send(response)})
      .catch(err => res.status(500).send(err.stack))
  },

  postQuestion: function(req, res) {
    console.log('postQuestion req.body: ', req.body);
    Models.insertQuestion(req.body)
      .then(data => res.status(201).send(data.rows))
      .catch(err => res.status(500).send(err.stack))
  },

  postAnswer: function(req, res) {
    Models.insertAnswer(req.body)
      .then(data => res.status(201).send(data.rows))
      .catch(err => res.status(500).send(err.stack))
  },

  putQuestionHelpful: function(req, res) {
    console.log((req.url).split('/')[3]);
    const id = req.params.question_id || req.params.answer_id;
    const table = (req.url).split('/')[2];
    const params = {
      id: id,
      table: table
    };
    Models.updateHelpful(params)
      .then(data => res.sendStatus(204))
      .catch(err => res.status(500).send(err.stack))
  },

  putAnswerHelpful: function(req, res) {
    const id = req.params.question_id || req.params.answer_id;
    const table = (req.url).split('/')[2];
    const params = {
      id: id,
      table: table
    };
    Models.updateHelpful(params)
      .then(data => res.sendStatus(204))
      .catch(err => res.status(500).send(err.stack))
  },

  putQuestionReport: function(req, res) {
    const id = req.params.question_id || req.params.answer_id;
    const table = (req.url).split('/')[2];
    const params = {
      id: id,
      table: table
    };
    Models.updateReported(params)
      .then(data => res.sendStatus(204))
      .catch(err => res.status(500).send(err.stack))
  },

  putAnswerReport: function(req, res) {
    const params = {
      id: req.params.question_id || req.params.answer_id,
      table: (req.url).split('/')[2]
    };
    Models.updateReported(params)
      .then(data => res.sendStatus(204))
      .catch(err => res.status(500).send(err.stack))
  }

}

// getOne: function (req, res) {
//   const urlTail = (req.url).split('/')[2];
//   Model.individual(urlTail)
//     .then((data) => res.status(200).send(data.rows[0]))
//     .catch((error) => res.status(500).send(error.stack));
// },
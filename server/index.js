require("dotenv").config();

const cors = require('cors');
const express = require("express");
const path = require("path");
const controllers = require("./controllers.js");
const compression = require('compression');
const {pool, questionQuery}=require('./db.js');

//-----------------Server App Instantiation ----------------
const app = express();

//-----------------Middleware-------------------------------
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT']
}));
app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));

//-----------------Router ----------------------------------
app.get('/qa/questions', controllers.getQuestions); //verified
app.get('/qa/questions/:question_id/answers', controllers.getAnswers);
app.post('/qa/questions', controllers.postQuestion);
app.post('/qa/questions/:question_id/answers', controllers.postAnswer);
app.put('/qa/questions/:question_id/helpful', controllers.putQuestionHelpful);
app.put('/qa/answers/:answer_id/helpful', controllers.putAnswerHelpful);
app.put('/qa/questions/:question_id/report', controllers.putQuestionReport);
app.put('/qa/answers/:answer_id/report', controllers.putAnswerReport);

//-----------------Server Instance and Port ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
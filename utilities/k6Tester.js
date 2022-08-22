import http from 'k6/http';
import { check, sleep } from 'k6';

// Load, Stress, Spike, Soak - types of tests

export const options = {
  // vus: 100,
  // duration: '30s',
  stages: [
    {duration: '30s', target: 100},
    {duration: '60s', target: 100},
    {duration: '30s', target: 200},
    {duration: '60s', target: 200},
    {duration: '30s', target: 500},
    {duration: '60s', target: 500},
    {duration: '30s', target: 1000},
    {duration: '60s', target: 1000},
    {duration: '2m', target: 0},
  ]
}

const url_get_questions = 'http://127.0.0.1:3000/qa/questions/?product_id=999999&page=2&count=10';
const url_get_answers = 'http://127.0.0.1:3000/qa/questions/999999/answers/';
const url_post_question = 'http://127.0.0.1:3000/qa/questions/';
const url_post_answer = 'http://127.0.0.1:3000/qa/questions/999999/answers';
const url_put_report_question = 'http://127.0.0.1:3000/qa/questions/999998/report';
const url_put_report_answer = 'http://127.0.0.1:3000/qa/answers/1200001/report';
const url_put_helpful_question = 'http://127.0.0.1:3000/qa/questions/999999/helpful';
const url_put_helpful_answer = 'http://127.0.0.1:3000/qa/answers/1200002/helpful';
const body_post_question = {
  "body": "the question to the answer is?",
  "name": "lord_magus",
  "email": "lord_magus@someemail.com",
  "product_id": 652
};
const body_post_answer = {
  "body": "the question to the answer is?",
  "name": "lord_magus",
  "email": "lord_magus@someemail.com",
  "photos": ['https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=', 'https://img.freepik.com/premium-photo/mesmerizing-view-green-landscape-with-trees-beautiful-cloudy-sky_181624-57064.jpg?w=2000']
};

export default function() {
  // const r1 = http.get(url_get_questions);
  // const r2 = http.get(url_get_answers);
  // const r3 = http.post(url_post_question, JSON.stringify(body_post_question), {headers: {'Content-Type': 'application/json'}});
  // const r4 = http.post(url_post_answer, JSON.stringify(body_post_answer), {headers: {'Content-Type': 'application/json'}});
  // const r5 = http.put(url_put_report_question);
  // const r6 = http.put(url_put_report_answer);
  // const r7 = http.put(url_put_helpful_question);
  const r8 = http.put(url_put_helpful_answer);

  const get_questions = {
    'GET_QUESTIONS status 200': r => r.status === 200,
    'GET_QUESTIONS time < 200ms': r => r.timings.duration < 200,
    'GET_QUESTIONS time < 500ms': r => r.timings.duration < 500,
    'GET_QUESTIONS time < 1000ms': r => r.timings.duration < 1000,
    'GET_QUESTIONS time < 2000ms': r => r.timings.duration < 2000,
  };
  const get_answers = {
    'GET_ANSWERS status 200': r => r.status === 200,
    'GET_ANSWERS time < 200ms': r => r.timings.duration < 200,
    'GET_ANSWERS time < 500ms': r => r.timings.duration < 500,
    'GET_ANSWERS time < 1000ms': r => r.timings.duration < 1000,
    'GET_ANSWERS time < 2000ms': r => r.timings.duration < 2000,
  };
  const post_question = {
    'POST_QUESTION status 201': r => r.status === 201,
    'POST_QUESTION time < 200ms': r => r.timings.duration < 200,
    'POST_QUESTION time < 500ms': r => r.timings.duration < 500,
    'POST_QUESTION time < 1000ms': r => r.timings.duration < 1000,
    'POST_QUESTION time < 2000ms': r => r.timings.duration < 2000,
  };
  const post_answer ={
    'POST_ANSWER status 201': r => r.status === 201,
    'POST_ANSWER time < 200ms': r => r.timings.duration < 200,
    'POST_ANSWER time < 500ms': r => r.timings.duration < 500,
    'POST_ANSWER time < 1000ms': r => r.timings.duration < 1000,
    'POST_ANSWER time < 2000ms': r => r.timings.duration < 2000,
  };
  const put_question_report = {
    'QUESTION_REPORT status 204': r => r.status === 204,
    'QUESTION_REPORT time < 200ms': r => r.timings.duration < 200,
    'QUESTION_REPORT time < 500ms': r => r.timings.duration < 500,
    'QUESTION_REPORT time < 1000ms': r => r.timings.duration < 1000,
    'QUESTION_REPORT time < 2000ms': r => r.timings.duration < 2000,
  };
  const put_answer_report = {
    'ANSWER_REPORT status 204': r => r.status === 204,
    'ANSWER_REPORT time < 200ms': r => r.timings.duration < 200,
    'ANSWER_REPORT time < 500ms': r => r.timings.duration < 500,
    'ANSWER_REPORT time < 1000ms': r => r.timings.duration < 1000,
    'ANSWER_REPORT time < 2000ms': r => r.timings.duration < 2000,
  };
  const put_question_helpful = {
    'QUESTION_HELPFUL status 204': r => r.status === 204,
    'QUESTION_HELPFUL time < 200ms': r => r.timings.duration < 200,
    'QUESTION_HELPFUL time < 500ms': r => r.timings.duration < 500,
    'QUESTION_HELPFUL time < 1000ms': r => r.timings.duration < 1000,
    'QUESTION_HELPFUL time < 2000ms': r => r.timings.duration < 2000,
  };
  const put_answer_helpful = {
    'ANSWER_HELPFUL status 204': r => r.status === 204,
    'ANSWER_HELPFUL time < 200ms': r => r.timings.duration < 200,
    'ANSWER_HELPFUL time < 500ms': r => r.timings.duration < 500,
    'ANSWER_HELPFUL time < 1000ms': r => r.timings.duration < 1000,
    'ANSWER_HELPFUL time < 2000ms': r => r.timings.duration < 2000
  };
  // check(r1, get_questions);
  // check(r2, get_answers);
  // check(r3, post_question);
  // check(r4, post_answer);
  // check(r5, put_question_report);
  // check(r6, put_answer_report);
  // check(r7, put_question_helpful);
  check(r8, put_answer_helpful);
}
require("dotenv").config();

const express = require("express");
const path = require("path");
// const controller = require("./controllers.js");
//const compression = require('compression');
const {pool, questionQuery}=require('./db.js');

const app = express();

app.use(express.json());
//app.use(compression());

app.use(express.static(path.join(__dirname, '../client/public')));


app.get('*', (req, res) => {
  questionQuery().then((result) => {res.json(result.rows)})
})
//define routes
// app.get("/*", controller.get)
// app.post("/*",controller.post)
// app.put("/*",controller.put)



//define port
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
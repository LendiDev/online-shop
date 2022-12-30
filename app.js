require('dotenv').config();
const path = require('path');
const express = require("express");

const app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('home');
});

app.use((error, req, res, next) => {
  res.status(500).render('500');
})

app.use('*', (req, res) => {
  res.status(404).render('404');
})

app.listen(process.env.PORT || 3000);

require('dotenv').config();
const path = require('path');
const express = require("express");

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.static('public'));
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/includes/')]);
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('home');
});

app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render('error/500');
})

app.use('*', (req, res) => {
  res.status(404).render('error/404');
})

app.listen(process.env.PORT || 3000);
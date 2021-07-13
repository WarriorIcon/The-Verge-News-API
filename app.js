require('dotenv').config()
const express = require('express');
const path = require('path')
const axios = require('axios');
const app = express();
const apiKey = process.env.API_KEY;
const moment = require('moment');
const date = "dddd, MMMM D, YYYY"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.date = date;

const now = moment().format('dddd, MMMM D, YYYY')

//set the directory for all templating engine files (ejs)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  axios.get(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${apiKey}`)
    .then(({data}) => {
      // console.log(data.articles[0].title)
      const articleData = data.articles;
      res.render('home.ejs', {articleData});  
  })
  .catch(err => {
    console.log("oops!", err)
    // here I should res.render something in case the API is down.
  }) 
}) 


app.get('/', (req, res) => {
  res.render('home.ejs');
}) 


// const navbarStyle = document.getElementsByClassName("nav-link dropdown-toggle") 
// // navbarStyle.append("style='color: #FFF'")

const port = 3000
app.listen(port, () => {
  console.log(`serving on port ${port}!`)
})

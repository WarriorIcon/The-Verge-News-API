require('dotenv').config()
const express = require('express');
const path = require('path')
const axios = require('axios');
const app = express();
const apiKey = process.env.API_KEY;

//set the directory for all templating engine files (ejs)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  axios.get(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${apiKey}`)
    .then(({data}) => {
      // console.log(data.articles[0].title)
      const articleData = data.articles;
      console.log(articleData[0].title)
      console.log(articleData[2].urlToImage)
      res.render('home.ejs', {articleData});  
  })
  .catch(err => {
    console.log("oops!", err)
    // here I should res.render something in case the API is down.
  }) 
}) 

/*
const getApiData = async () => {
  const articles = await axios.get(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${apiKey}`)
  console.log(articles.data.articles)
  const newLI = document.createElement('LI');
  newLI.append(articles)
  list.append(newLI)

}

getApiData()
*/

app.get('/', (req, res) => {
  res.render('home.ejs');
}) 


// const navbarStyle = document.getElementsByClassName("nav-link dropdown-toggle") 
// // navbarStyle.append("style='color: #FFF'")

const port = 3000
app.listen(port, () => {
  console.log(`serving on port ${port}!`)
})

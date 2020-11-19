const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use('/assets', express.static(process.cwd() + '/assets'));
app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//     res.render('index')
// });

app.get('/blog', function(req, res) {
    res.render('blog')
});

app.get('/detail', function(req, res) {
    res.render('detail')
});

app.get('/c', function(req, res) {
    res.render('contact')
});

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0ec403fe82154bebb082fb82b6d436ce');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  country: 'ng'
}).then(response => {
  console.log(response.articles[4]);
    app.get('/', function(req, res) {
        res.render('index', {'news': response});
    });
})
.catch(error => { console.log(error)})
// // To query /v2/everything
// // You must include at least one q, source, or domain
// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });
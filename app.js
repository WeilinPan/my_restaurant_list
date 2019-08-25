// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// input movies.json
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: "main"
}))
app.set('view engine', '.hbs')


// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.includes(keyword)
  })
  res.render('index', { restaurants, keyword })
})

// setting static files
app.use(express.static('public'))



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
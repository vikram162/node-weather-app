const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
//Define the paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set the handlebars and config 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {

  res.render('index', {
    title: 'weather app',
    name: 'Andrew Mead'
  })

})

app.get('/about', (req, res) => {

  res.render('about', {
    title: 'About HandleBars',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {

  res.render('help', {
    title: 'Help',
    name: 'Andrew Mead',
    helpText: 'This is someful text'
  })
})
app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'you must send an address'
      
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location,
            address:req.query.address
          })
        })
  })
})

app.get('/products', (req, res) => {

  if(!req.query.search) {
    return res.send({
      error: 'you must send a search term'
      
    })
  }
  console.log(req.query)
  res.send ({
    products: []
  })
})

app.get('/help/*', (req, res) => {

 res.render('notfound', {

  name: 'Andrew Mead',
  notFoundError: 'Help Article not found'
 })
})

app.get('*', (req, res) => {

 res.render('notfound', {
   name: 'Andrew Mead',
   notFoundError: '404 page not found'
 })
})

app.listen(port, () => {
  console.log('Server is Up on port ' +port)
})

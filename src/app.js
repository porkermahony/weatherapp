const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directopry to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Tailor'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Tailor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Tailor',
        message: 'What can I help you?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode.geoCode(req.query.address, (location_error, { latitude, longitude, location } = {}) => {
        if(location_error) {
            return res.send({ location_error })
        } 

        geocode.forecast(latitude, longitude, (weather_error, weather_data) => {
            if(weather_error) {
                return res.send({ weather_error })
            }

            return res.send({
                forecast: weather_data,
                location: location,
                address: req.query.address
            })
        })
        
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'U must provide a search term'
        })
    } else {
            
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404')
})

app.get('*', (req,res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
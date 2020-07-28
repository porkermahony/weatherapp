const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmFkZXN6IiwiYSI6ImNrY3p3Zzd1azBreTkycnZwcnc1NDkzaGgifQ.e3f7D0ViXsN1KlG1urZuAQ&limit=1"

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another serach.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe2c7e0d11a39ad05ba32fc666c485c5&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback({
                error: 'Unable to find location'
            }, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = {
    geoCode: geoCode,
    forecast: forecast
}
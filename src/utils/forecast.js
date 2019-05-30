const request = require('request')
const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/2234523e48e7618751cfd4ad9e7f66ac/' +latitude + ',' + longitude
  request({url, json: true}, (error, {body}) => {
  if (error) {
   callback('Unable to connect to weather Services. Please try again !!!')
  } else if (body.error) {
  callback('Unable to find the location. try Another Search!', undefined)
  }else {
    callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.apparentTemperature + ' degrees out. There is a '
    + body.currently.precipProbability + '% chance of a rain')
  }
  })
}

module.exports = forecast

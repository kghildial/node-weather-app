const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2b309dc2b52a0287bcc2d7581550324e/' + latitude + ',' + longitude + '?units=si';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast;
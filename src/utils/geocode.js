const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2luc2h1a2doaWxkaWFsIiwiYSI6ImNrMmJkZGVlYzRpMWszYnBpYW56ajZ1cnEifQ.8tCgoudUh5oPBv5plMcy0w';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
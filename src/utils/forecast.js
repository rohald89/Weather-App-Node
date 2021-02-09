const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=97bbaf9ecd4e4adff3303f8edf4d9776&query=${latitude},${longitude}`;

    request({ url, json: true} , (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const {temperature, feelslike, weather_descriptions } = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    });
};

module.exports = forecast;

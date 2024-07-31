const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=51a20bc2793045b6b26142621220803&q=${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (response.body.error) {
            callback(response.body.error.message, undefined);
        } else {
            console.log('Response body:', response.body);
            if (response.body.current && response.body.current.temp_c !== undefined) {
                callback(undefined, response.body.current.temp_c); 
            } else {
                callback('Temperature data is not available', undefined);
            }
        }
    });
};

module.exports = forecast;

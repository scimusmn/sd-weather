/**
 * Weather
 *
 * Model for all of the weather data coming from forecast.io
 */

Weather = new Meteor.Collection('weather');

/**
 * Weather methods
 */
Meteor.methods({
    insertWeather: function (weather) {
        Weather.insert({
            time: weather.currently.time,
            latitude: weather.latitude,
            longitude: weather.longitude,
            temperature: weather.currently.temperature
        });
    },
});

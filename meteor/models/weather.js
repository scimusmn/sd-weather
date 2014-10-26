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
    insertWeather: function (forecast, locName, locClass, locOrder) {
        Weather.insert({
            name: locName,
            class: locClass,
            order: locOrder,
            time: forecast.currently.time,
            latitude: forecast.latitude,
            longitude: forecast.longitude,
            temperature: forecast.currently.temperature
        });
    },
});

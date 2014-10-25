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
    insertWeather: function (forecast, locId) {
        console.log('locId - ', locId);
        Weather.insert({
            name: locId,
            time: forecast.currently.time,
            latitude: forecast.latitude,
            longitude: forecast.longitude,
            temperature: forecast.currently.temperature
        });
    },
});

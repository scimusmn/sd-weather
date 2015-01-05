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
            icon: forecast.currently.icon,
            temperature: forecast.currently.temperature,
            temperatureMin: forecast.daily.data[0].temperatureMin,
            temperatureMax: forecast.daily.data[0].temperatureMax,
            dewPoint: forecast.currently.dewPoint,
            humidity: forecast.currently.humidity,
            precipProbability: forecast.currently.precipProbability,
            windSpeed: forecast.currently.windSpeed,
            windBearing: forecast.currently.windBearing
        });
    },
});

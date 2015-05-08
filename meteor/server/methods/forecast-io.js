/**
 * Start cron process when the meteor app launches
 */
SyncedCron.start();

/**
 * Cron process to check the forecast.io weather every X minutes
 */
SyncedCron.add({
    name: 'forecast.io api query',
    lastCheck: 'value',
    schedule: function(parser) {
        /**
         * Load the frequency sting from the config file at:
         *     settings/settings.json
         */
        var requestFreq = Meteor.settings.public.requestFreq;
        return parser.text(requestFreq);
    },

    job: function() {
        /**
         * Check the cron history to find the order of the location previously
         * updated with Forecast.io
         */
        var cronCollection = SyncedCron._collection;

        // Only get the latest result. Ignore entries with no results (errors)
        var latestCron = cronCollection.findOne(
            { result: { $exists: true } }, {sort: {finishedAt: -1}, limit:1}
        );

        // Make sure to populate the value even if it doesn't exist in the DB
        //
        // This can happen during testing or if the location numbers change.
        var latestOrder;
        if (typeof latestCron === 'undefined') {
            latestOrder = 0;
        }
        else {
            if (latestCron.result.hasOwnProperty('locOrder')) {
                latestOrder = latestCron.result.locOrder;
            }
            else {
                latestOrder = 0;
            }
        }

        /**
         * Itterate the locaction order. Loop back around to the start if we
         * get to the max.
         */
        var locationsNum = Locations.find().count();
        var locOrder;
        if (latestOrder === (locationsNum - 1)) {
            locOrder = 0;
        }
        else {
            locOrder = parseInt(latestOrder) + 1;
        }

        // Get details about the location we're about to check
        var locationToRequest = Locations.findOne({ order: locOrder });

        /**
         * Generate a forecast request reponse object to save to the cron
         * collection. This lets us know the history of cron operations so
         * that we can be efficient with our requests.
         */
        var f = {};
        f.name = locationToRequest.title;
        f.class = locationToRequest._id;
        f.latitude = locationToRequest.latitude;
        f.longitude = locationToRequest.longitude;
        f.locOrder = locOrder;
        var result = checkForecastCron(f.latitude, f.longitude);

        // Get the data object from the JSON response
        var forecast = result.data;

        // Insert the forecast data into the Mongo database Weather model
        Meteor.call('insertWeather', forecast, f.name, f.class, f.locOrder, function(error, result) {
            if (error) {
                console.log('error - ', error);
            }

            if (result) {
                console.log('result - ', result);
            }
        });

        /**
         * Return to the SyncedCron collection so that we can track the
         * previous cron details next time around.
         */
        return f;
    }
});

/**
 * Request JSON object of the weather data from forecast.io
 */
var checkForecastCron = function(latitude, longitude) {
    var apiKey = Meteor.settings.public.forecastAPI;
    var protocol = 'https://';
    var apiDomain = 'api.forecast.io';
    var apiType = 'forecast';
    var url = protocol +
        apiDomain + '/' +
        apiType + '/' +
        apiKey + '/' +
        latitude + ',' +
        longitude;
    var forecastResult = HTTP.get(url);
    return forecastResult;
};

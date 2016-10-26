/**
 * Start cron process when the meteor app launches
 */
SyncedCron.start();

/**
 * Cron process to check the forecast.io weather every X minutes
 */
SyncedCron.add({
    name: 'weather api query',
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

        // Get the order of the location to check
        var locOrder = getCurrentOrder();

        // Get details about the location we're about to check
        var locationToRequest = Locations.findOne({ order: locOrder });

        /**
         * Generate a forecast request reponse object.
         *
         * Saving the forecast history lets us know the history of cron
         * operations so that we can be efficient with our requests.
         */
        var f = {};
        f.name = locationToRequest.title;
        f.class = locationToRequest._id;
        f.latitude = locationToRequest.latitude;
        f.longitude = locationToRequest.longitude;
        f.locOrder = locOrder;

        // Query forecast.io for weather data
        var result = queryForecast(f.latitude, f.longitude);

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
         * We aren't displaying any historical information about the data, so
         * there's no reason to save it. There are plenty of reasons not to
         * save it, namely diskspace and long run DB happiness.
         */
        deleteOldData(forecast.currently.time);

        /**
         * Return to the SyncedCron collection so that we can track the
         * previous cron details next time around.
         */
        return f;
    }
});

/**
 * Delete weather data after a few minutes
 */
function deleteOldData(currentTime) {
    // Save 30 minutes worth
    var secondsBackToSave = 30 * 60;
    var timeCutoff = currentTime - secondsBackToSave;
    Weather.remove({time: {$lt: timeCutoff}})
}

/**
 * Check the cron history to find the order of the location previously
 * updated with Forecast.io
 */
function getLatestOrder() {
    var cronCollection = SyncedCron._collection;

    // Only get the latest result. Ignore entries with no results (errors)
    var latestCron = cronCollection.findOne(
        { result: { $exists: true } }, {sort: {finishedAt: -1}, limit:1}
    );

    // Make sure to populate the value even if it doesn't exist in the DB
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

    return latestOrder;
}

/**
 * Itterate the locaction order. Loop back around to the start if we
 * get to the max.
 */
function getCurrentOrder() {
    var latestOrder = getLatestOrder();
    var locationsNum = Locations.find().count();
    var locOrder;

    if (latestOrder === (locationsNum - 1)) {
        locOrder = 0;
    }
    else {
        locOrder = parseInt(latestOrder) + 1;
    }

    return locOrder;
}

/**
 * Request JSON object of the weather data from forecast.io
 */
var queryForecast = function(latitude, longitude) {
    var apiKey = Meteor.settings.public.forecastAPI;
    var protocol = 'https://';
    var apiDomain = 'api.darksky.net';
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

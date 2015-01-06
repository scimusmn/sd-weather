
/**
 * Timer async example.
 *
 * I have this in here to demonstrate how the async wrappers work in Meteor.
 *
 * It should probably come out at some point,
 * but for now it is a useful demonstration.
 */
var timerTestAsync = function(callback) {
    Meteor.setTimeout(function () {
        callback(null, 'Waited 5 seconds before reporting back.');
    }, 5000);
};

/**
 * Get forecast.io JSON object for a given lat long
 *
 * This request can take some time and we don't want it to block
 * our page load process. So we label it as a Async function. We'll wrap
 * it in a Meteor helper when we call it.
 */
var checkForecastAsync = function(latitude, longitude, callback) {
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
    //
    // Execute a callback to return the results
    //
    // The first parameter is an error.
    // The 2nd is the result of the call.
    //
    callback(null, forecastResult);
};

Meteor.methods({
    /**
     * Timer async method example
     */
    timerTest: function () {
        // Don't block, or pause, everything while we execute this call.
        this.unblock();

        var timerTestSync = Meteor.wrapAsync(timerTestAsync);
        var result;
        try {
            result = timerTestSync();
            console.log('Server timerTest - ', result);
        }
        catch(e) {
            console.log('getData method error' + e);
        }
        finally{
            return result;
        }
    },
    checkForecast: function (latitude, longitude) {
        // Don't block, or pause, everything while we execute this call.
        this.unblock();

        var checkForecastSync = Meteor.wrapAsync(checkForecastAsync);
        var result;
        try {
            result = checkForecastSync(latitude, longitude);
            //
            // Print the forecast.io JSON result for debugging
            //
            //console.log('Server checkForecast - ', result);
        }
        catch(e) {
            console.log('checkForecast error' + e);
        }
        finally {
            return result.data;
        }
    }
});

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
    //console.log('Cron result - forecastResult - ', forecastResult);
    return forecastResult;
};

/**
 * Cron process to check the forecast.io weather every X minutes
 */
SyncedCron.add({
    name: 'forecast.io api query',
    lastCheck: 'value',
    schedule: function(parser) {
        /**
         * Query calculations
         *
         * The forecast.io API allows us 1000 calls per day for free.
         *
         * We have 5 locations. Which gives us 200 calls per location per day.
         *
         * If we query every few minutes that gives us a bit of padding on the
         * API limit.
         *
         * This loads the frequency sting from the config file at:
         *     settings/settings.json
         */
        var requestFreq = Meteor.settings.public.requestFreq;
        console.log('requestFreq - ', requestFreq);
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
        //console.log('latestCron - ', latestCron);

        // Make sure to populate the value even if it doesn't exist in the DB
        //
        // This can happen during testing or if the location numbers change.
        var latestOrder;
        if(typeof latestCron === 'undefined'){
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

        //
        // Itterate the locaction order. Loop back around to the start if we
        // get to the max.
        //
        var locationsNum = Locations.find().count();
        var locOrder;
        if ( latestOrder === ( locationsNum - 1 ) ) {
            locOrder = 0;
        }
        else {
            locOrder = parseInt(latestOrder) + 1;
        }

        // Get details about the location we're about to check
        var locationToRequest = Locations.findOne( { order: locOrder });
        //console.log('locationToRequest - ', locationToRequest);

        //
        // Generate a forecast request reponse object to save to the
        // cron collection. This lets us know the history of cron operations
        // so that we can be efficient with our requests.
        //
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

        // Return to the SyncedCron collection so that we can track the
        // previous cron details next time around.
        return f;
    }
});

/**
 * Start cron process when the meteor app launches
 */
SyncedCron.start();

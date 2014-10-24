
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
    var apiKey = '76cbd9069c2c764b31570a5f661fb8c3';
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
            console.log('Server checkForecast - ', result);
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
    var apiKey = '76cbd9069c2c764b31570a5f661fb8c3';
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
    console.log('Cron result - forecastResult - ', forecastResult);
    return forecastResult;
};

/**
 * Cron process to check the forecast.io weather every X minutes
 */
SyncedCron.add({
    name: 'Check for the latest forecast.io weather data',
    schedule: function(parser) {
        /**
         * Query calculations
         *
         * The forecast.io API allows us 1000 calls per day for free.
         *
         * We have 5 locations. Which gives us 200 calls per location per day.
         *
         * If we query every 10 minutes that gives us a bit of padding on the
         * API limit.
         */

        //
        // Dev cron timing
        // Don't leave this running too long. It'll bork our API access
         //return parser.text('every 20 seconds');
        //

        //
        // Operational timing. I bet we only need to update the weather
        // every 5 minutes
        //
        return parser.text('every 10 minutes');
    },
    job: function() {
        // TODO cycle through locations
        var latitude = '33.259167';
        var longitude = '-116.399167';
        var result = checkForecastCron(latitude, longitude);

        // Get the data object from the JSON response
        var forecast = result.data;

        // Insert the forecast data into the Mongo database Weather model
        Meteor.call('insertWeather', forecast, function(error, result) {
            console.log('Server cron - error - ', error);
            console.log('Server cron - forecast - ', result);
            return result;
        });
    }
});

/**
 * Start cron process when the meteor app launches
 */
SyncedCron.start();

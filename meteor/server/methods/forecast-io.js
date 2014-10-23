
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

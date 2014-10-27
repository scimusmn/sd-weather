/**
 *
 * Client side - Locations
 *
 */

Template.locations.created = function () {
    //
};

Template.locations.rendered = function () {
    //
};

Template.locations.events({
    //
});

Template.locations.helpers({
    locations: function() {
        return Locations.find();
    }
});

/**
 * Publish a limited set of the weather data for each individual location
 */
Template.singleLocation.helpers({
    latestWeather: function() {
        // Query client miniMongo
        var result = Weather.findOne({class: this._id}, { sort: { time: -1 }});
        console.log('result - ', result);

        // Format strings
        result.temperature = formatWeather(result.temperature);

        return result;
    },
    weathers: function() {
        // Filter the weather data by the current location ID
        var result = Weather.find({class: this._id}, { sort: { time: -1 }, limit: 2 } );
        return result;
    }
});

function formatWeather(input) {
    // Round to one decimal place
    var rounded = Math.round( input * 10 ) / 10;
    return rounded + '&deg;';
}

function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

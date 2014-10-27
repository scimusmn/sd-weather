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

        return result;
    },
    weathers: function() {
        // Filter the weather data by the current location ID
        var results = Weather.find({class: this._id}, { sort: { time: -1 }, limit: 20 } );

        if (results) {
            console.log('results - ', results.fetch());
        }

        return results;
    }
});


function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

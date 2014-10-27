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
    latestTemp: function() {
        var result = Weather.findOne({class: this._id}, { sort: { time: -1 }});
        console.log('result - ', result);
        return result.temperature;
    },
    weathers: function() {
        // Filter the weather data by the current location ID
        var result = Weather.find({class: this._id}, { sort: { time: -1 }, limit: 2 } );
        return result;
    }
});

function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

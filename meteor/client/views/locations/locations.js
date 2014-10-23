/**
 *
 * Client side - Locations
 *
 */

Template.locations.created = function () {
  //
};

Template.locations.helpers({
  //
});

Template.locations.rendered = function () {

    var locationsCursor = Locations.find();
    var locations = locationsCursor.fetch();

    _.each(locations, function (location) {
        console.log('location - ', location);
        var latitude = location.latitude;
        var longitude = location.longitude;
        var locationClass = lowerSpacesToDashes(location.title);
        Meteor.call('checkForecast', latitude, longitude, function(error, results) {
            var temp = results.currently.temperature;
            console.log('Temp in ' + location.title + ' is ' + temp);
            $('.' + locationClass + ' h2 .forecast-temp').html(temp);
        });
    });

    //
    // Use this once we start writing the data to the DB
    //
    //Meteor.call('insertCurrent', data.currently, cityStateZip, lat, lon);

    /**
     * Dev call to the timer function to test asynchonus calls
     */
    Meteor.call('timerTest', function(error, result) {
        console.log('Client timerTest results - ', result);
    });

};

Template.locations.events({
  //
});

function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

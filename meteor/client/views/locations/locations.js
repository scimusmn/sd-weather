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
    //
};

Template.locations.events({
  //
});

Template.locWeather.helpers({
    weather: function() {
        return Weather.findOne( { class: this._id } );
    }
});

Template.locWeather.rendered = function () {
};

function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

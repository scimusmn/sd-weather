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

Template.singleLocation.helpers({
    special: function() {
        console.log('this - ', this);
    },
    weather: function() {
        console.log('this - ', this);
        return Weather.find({class: this._id});
    }
    //weather: function() {
        //console.log('this - ', this);
        //console.log('this._id - ', this._id);
        //return Weather.find({class: this._id});
    //}
});

//Template.singleLocation.helpers({
    //special: function() {
        //console.log('Each time');
        //return 'special';
    //},
    //weather: function() {
        ////console.log('this._id - ', this._id);
        //console.log('weatherResult - ', Weather.find({class: this._id}));
        ////console.log('weatherResult - ', weatherResult);
        //return Weather.find({class: this._id});
    //}
//});

//Template.locWeather.helpers({
    //weather: function() {
        //return Weather.findOne( { class: this._id }, { sort: {time: -1} } );
    //}
//});

//Template.locWeather.rendered = function () {
//};





function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

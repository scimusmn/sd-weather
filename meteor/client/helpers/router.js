/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

// Filters

var filters = {

    myFilter: function () {
        // do something
    },

};

// Routes

Router.map(function() {

    /**
     * The homepage is a view of all the locations
     */
    this.route('locations', {
        path: '/',
        waitOn: function () {
            return Meteor.subscribe('allLocations');
        },
        //data: function () {
            //return {
                //locations: Locations.find()
            //};
        //}
    });

    this.route('content');

});

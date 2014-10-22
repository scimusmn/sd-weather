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

Router.onBeforeAction(filters.myFilter, {only: ['items']});

// Routes

Router.map(function() {

    /**
     * Locations
     */
    this.route('locations', {
        waitOn: function () {
            return Meteor.subscribe('allLocations');
        },
        data: function () {
            return {
                locations: Locations.find()
            };
        }
    });

    this.route('location', {
        path: '/locations/:_id',
        waitOn: function () {
            return Meteor.subscribe('singleLocation', this.params._id);
        },
        data: function () {
            return {
                location: Locations.findOne(this.params._id)
            };
        }
    });

    /**
     * Items
     */
    this.route('items', {
        waitOn: function () {
            return Meteor.subscribe('allItems');
        },
        data: function () {
            return {
                items: Items.find()
            };
        }
    });

    this.route('item', {
        path: '/items/:_id',
        waitOn: function () {
            return Meteor.subscribe('singleItem', this.params._id);
        },
        data: function () {
            return {
                item: Items.findOne(this.params._id)
            };
        }
    });


    // Pages

    this.route('homepage', {
        path: '/'
    });

    this.route('content');

});

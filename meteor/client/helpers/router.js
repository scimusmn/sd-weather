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

    this.route('content');

});

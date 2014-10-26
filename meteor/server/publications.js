/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

/**
 * Locations
 *
 * Publish all locations. There will only ever be a fixed number of locations
 *
 * Sort them by the prescribed order.
 */
Meteor.publish('allLocations', function() {

    /**
     * Get the latest weather data for each location
     *
     * TODO:
     * Filter the weather collection down so that we're not sending the
     * entire weather database over the wire.
     */

    return [
        Locations.find({}, { sort: { order: 1 } }),
        Weather.find({}, {sort: { time: -1}, limit: 20} )
    ];

});

/**
 * Publish a single location
 */
Meteor.publish('singleLocation', function(id) {
    return Locations.find(id);
});

/**
 * Items
 *
 * Publish all items
 */
Meteor.publish('allItems', function() {
    return Items.find();
});

// Publish a single item
Meteor.publish('singleItem', function(id) {
    return Items.find(id);
});

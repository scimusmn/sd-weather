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
    return Locations.find({}, { sort: { order: 1 } });

});

// Publish a single item
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

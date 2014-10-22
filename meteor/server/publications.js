/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

/**
 * Locations
 *
 * Publish all locations. There will only ever be a fixed number of locations
 */
Meteor.publish('allLocations', function() {
    return Locations.find();
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

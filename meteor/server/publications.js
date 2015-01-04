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
        //Weather.find({})
        Weather.find({}, {sort: { time: -1}, limit: 5} )
    ];

});

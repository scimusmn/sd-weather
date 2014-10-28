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

Template.singleLocation.rendered = function () {

    var selector = '.' + this.data._id + ' .wind-svg';
    var svgWidth = 100;
    var svgHeight = 100;
    var svg = d3.select(selector)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var triWidth = 40;
    var triHeight = 45;
    var triA = [0, 0];
    var triB = [ (triWidth / 2), triHeight];
    var triC = [triWidth, 0];
    var triD = [ (triWidth / 2), ( triHeight / 4 ) ];
    var triX = (triWidth / 2);
    var triY = (triHeight / 2);
    var triCenterX = triX + (triWidth / 2);
    var triCenterY = triY + (triHeight / 2);

    //var rectRotation = d3.select(selector).attr('data-wind-speed');
    var rectRotation = '5';
    svg
        .append('polygon')
        .attr('points',function() {
            return triA.join(',') + ' ' + triB.join(',') + ' ' + triC.join(',') + ' ' + triD.join(',');
        })
        .style('fill', 'steelblue')
        .attr('transform', function() {
            return 'translate(' + ( svgWidth / 2 ) + ',' + ( svgHeight / 2 ) + ')';
        });

    var weatherCollection = Weather.find({class: this.data._id}, { sort: { time: -1 }} );
    weatherCollection.observeChanges({
        added: function () {
            var windRect = d3.select(selector + ' svg polygon');
            var windBearing = d3.select(selector).attr('data-wind-bearing');
            windRect
                .attr('transform', function() {
                    return 'translate(' + ( ( svgWidth / 2 ) - triX ) + ',' + ( ( svgHeight / 2 ) - triY ) + ') rotate(' + windBearing + ',' + triX + ',' + triY + ')';
                });
        }
    });

    Deps.autorun(function(){
        // TODO - Do this with D3 instead of jQuery
        //console.log('Deps - jQuery bearing - ', $(selector).data('wind-bearing'));
        //console.log('Deps - jQuery speed - ', d3.select(selector).attr('data-wind-speed'));
    });

    window.setTimeout(function() {
        //console.log('2000 - jQuery bearing - ', $(selector).data('wind-bearing'));
        //console.log('2000 - jQuery speed - ', d3.select(selector).attr('data-wind-speed'));
    }, 2000);

    //Weather.find().observe({
        //changed: function () {
            //console.log('The Weather collection changed');
        //}
    //});
};

/**
 * Publish a limited set of the weather data for each individual location
 */
Template.singleLocation.helpers({
    latestWeather: function() {
        // Query client miniMongo
        var result = Weather.findOne({class: this._id}, { sort: { time: -1 }});
        return result;
    },
    weathers: function() {
        // Filter the weather data by the current location ID
        var results = Weather.find({class: this._id}, { sort: { time: -1 }, limit: 20 } );
        return results;
    }
});


function lowerSpacesToDashes(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
};

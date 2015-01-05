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

    var offWhite = '#F6E9C7';
    var selector = '.' + this.data._id + ' .wind-svg';
    var svgWidth = 100;
    var svgHeight = 100;
    var svg = d3.select(selector)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    /**
     * Draw wind circle
     */
    var windGroup = svg.append('g');

    windGroup
        .append('circle')
        .attr('r', 37.5)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('fill', 'none')
        .attr('stroke', offWhite)
        .attr('stroke-width', 1.5);

    /**
     * Draw wind arrow
     */
    var triWidth = 65;
    var triHeight = 65;
    var triA = [5, 5];
    var triB = [(triWidth / 2), ((triHeight / 2) - 12)];
    var triC = [(triWidth / 2), (triHeight / 2)];
    var triD = [((triWidth / 2) - 12), (triHeight / 2)];
    var triX = (triWidth / 2);
    var triY = (triHeight / 2);
    windGroup
        .append('polygon')
        .attr('points',function() {
            return triA.join(',') + ' ' + triB.join(',') + ' ' + triC.join(',') + ' ' + triD.join(',');
        })
        .style('fill', '#e1d5b6');
        //.attr('stroke', '#9a927d')
        //.attr('stroke-width', 1.5)

    windGroup
        .attr('transform', function() {
            return 'translate(' + ( svgWidth / 2 ) + ',' + ( svgHeight / 2 ) + ')';
        });

    /**
     * Watch for changes in wind direction and rotate the triangle
     */
    if (true) {
        var weatherCollection = Weather.find({class: this.data._id}, { sort: { time: -1 }} );
        weatherCollection.observeChanges({
            added: function () {
                //var windRect = d3.select(selector + ' svg polygon');
                //console.log('d3.select(selector)', d3.select(selector));
                var windBearing = d3.select(selector).attr('data-wind-bearing');
                windGroup
                    .attr('transform', function() {
                        var translate = 'translate(' +
                            ( svgWidth / 2 ) +
                            ',' +
                            ( svgHeight / 2 ) +
                            ')';
                        // Rotate the arrow to point North
                        var rotateNorth = -135;
                        // The wind bearing data represents the direction
                        // that the wind is coming from. Our arrow points to
                        // where the wind is going. So we add 180 degrees
                        // to rotate the arrow correctly.
                        var reverseBearing = parseInt(windBearing) + 180;
                        var rotate = 'rotate(' + (rotateNorth + reverseBearing) + ',' + 0 + ',' + 0 + ')';
                        // Shrink everything a bit to fit
                        var scale = 'scale(.7, .7)';
                        return translate + ' ' + rotate + ' ' + scale;
                    });
            }
        });
    }

    svg
        .append('svg:text')
        .attr('x', 46)
        .attr('y', 17)
        .attr('class', 'ordinals')
        .text('N');

    svg
        .append('svg:text')
        .attr('x', 84)
        .attr('y', 54)
        .attr('class', 'ordinals')
        .text('E');

    svg
        .append('svg:text')
        .attr('x', 47)
        .attr('y', 94)
        .attr('class', 'ordinals')
        .text('S');

    svg
        .append('svg:text')
        .attr('x', 6)
        .attr('y', 55)
        .attr('class', 'ordinals')
        .text('W');


    //Deps.autorun(function(){
        //// TODO - Do this with D3 instead of jQuery
        //console.log('Deps - jQuery bearing - ', $(selector).data('wind-bearing'));
        //console.log('Deps - jQuery speed - ', d3.select(selector).attr('data-wind-speed'));
    //});

    //window.setTimeout(function() {
        //console.log('2000 - jQuery bearing - ', $(selector).data('wind-bearing'));
        //console.log('2000 - jQuery speed - ', d3.select(selector).attr('data-wind-speed'));
    //}, 2000);

    Weather.find().observe({
        changed: function () {
            console.log('The Weather collection changed');
        }
    });
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

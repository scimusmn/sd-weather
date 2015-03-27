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
    var midWhite = '#dbcfb2';
    var darkWhite = '#c2b79d';
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
        .attr('stroke-width', 4);

    /**
     * Draw wind arrow
     */
    var triWidth = 65;
    var triHeight = 65;
    var triA = [0, 0];
    var triB = [(triWidth / 2), ((triHeight / 2) - 15)];
    var triC = [(triWidth / 2) + 2, (triHeight / 2) + 2];
    var triD = [((triWidth / 2) - 15), (triHeight / 2)];
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
        .attr('y', 13)
        .attr('class', 'ordinals')
        .text('N');

    svg
        .append('svg:text')
        .attr('x', 87)
        .attr('y', 54)
        .attr('class', 'ordinals')
        .text('E');

    svg
        .append('svg:text')
        .attr('x', 47)
        .attr('y', 96)
        .attr('class', 'ordinals')
        .text('S');

    svg
        .append('svg:text')
        .attr('x', 4)
        .attr('y', 55)
        .attr('class', 'ordinals')
        .text('W');

    var markerSvgWidth = 1080;
    var markerSvgHeight = 1920;
    var markerId = this.data._id;
    console.log('markerId - ', markerId);
    var markerX;
    var markerY;
    var lineMarkerX;
    var lineMarkerY;
    var lineBoxX;
    var lineBoxY;
    var markerColor;
    if (markerId == 'san-diego') {
        markerX = 428;
        markerY = 1355;
        lineMarkerX = markerX + 1;
        lineMarkerY = markerY + 7;
        lineBoxX = markerX - 100;
        lineBoxY = markerY + 75;
        markerColor = '#585A25';
    }
    else if (markerId == 'temecula') {
        markerX = 432;
        markerY = 1175;
        lineMarkerX = markerX + 1;
        lineMarkerY = markerY + 6;
        lineBoxX = markerX + 160;
        lineBoxY = markerY - 20;
        markerColor = '#C8171D';
    }
    else if (markerId == 'santa-monica') {
        markerX = 161;
        markerY = 1048;
        lineMarkerX = markerX + 7;
        lineMarkerY = markerY;
        lineBoxX = markerX + 100;
        lineBoxY = markerY - 358;
        markerColor = '#477362';
    }
    else if (markerId == 'brawley') {
        markerX = 738;
        markerY = 1298;
        lineMarkerX = markerX + 5;
        lineMarkerY = markerY + 1;
        lineBoxX = markerX + 40;
        lineBoxY = markerY + 133;
        markerColor = '#BA8D25';
    }
    else if (markerId == 'san-jacinto-peak'){
        markerX = 520;
        markerY = 1100;
        lineMarkerX = markerX + 8;
        lineMarkerY = markerY - 2;
        lineBoxX = markerX + 150;
        lineBoxY = markerY - 410;
        markerColor = '#162423';
    }
    var markerSelector = '.' + markerId + ' .marker-svg';
    var markerSvg = d3.select(markerSelector)
        .append('svg')
        .attr('width', markerSvgWidth)
        .attr('height', markerSvgHeight);


    var lineGroup = markerSvg.append('g');

    var markerGroup = markerSvg.append('g');

    var lineData = [ { 'x': lineMarkerX, 'y': lineMarkerY }, { 'x': lineBoxX,  'y': lineBoxY} ];

    var lineFunction = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate('linear');

    var lineGraph = lineGroup.append('path')
        .attr('d', lineFunction(lineData))
        .attr('stroke', '#444')
        .attr('stroke-width', 1.5)
        .attr('fill', 'none');

    markerGroup
        .append('path')
        .attr('r', 16)
        .attr('cx', 5)
        .attr('cy', 5)
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#blur)');

    /**
     * Marker shadow
     */
    markerGroup
        .append('circle')
        .attr('r', 16)
        .attr('cx', 5)
        .attr('cy', 5)
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#blur)');

    /**
     * Stroke circle
     */
    markerGroup
        .append('circle')
        .attr('r', 16)
        .attr('cx', 5)
        .attr('cy', 5)
        .attr('stroke', '#555')
        .attr('stroke-width', 2);

    /**
     * Marker circle
     */
    markerGroup
        .append('circle')
        .attr('r', 15)
        .attr('cx', 5)
        .attr('cy', 5)
        .attr('stroke', offWhite)
        .attr('stroke-width', 2)
        .attr('fill', markerColor);

    var filter = markerGroup.append('defs')
        .append('filter')
        .attr('id', 'blur')
        .attr('y', '-50%')
        .attr('x', '-50%')
        .attr('width', '200%')
        .attr('height', '200%')
        .append('feGaussianBlur')
        .attr('stdDeviation', 3);

    /**
     * Position markers
     */
    markerGroup
        .attr('transform', function() {
            var translate = 'translate(' +
                ( markerX ) +
                ',' +
                ( markerY ) +
                ')';
            return translate;
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

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

    /**
     * Dew point measurement
     */
    var dewSvgWidth = 150;
    var dewSvgHeight = 100;
    var dewSelector = '.' + this.data._id + ' .dew-svg';
    var dewSvg = d3.select(dewSelector)
        .append('svg')
        .attr('width', dewSvgWidth)
        .attr('height', dewSvgHeight);

    var minDew = 35;
    var dryUpperBound = 50;
    var niceUpperBound = 64;
    var maxDew = 80;

    /**
     * Arc settings
     */
    var backgroundArc = d3.svg.arc()
        .outerRadius(50)
        .innerRadius(35);

    var dewArcs = dewSvg.append('g');

    /**
     * Background arc
     */
    dewArcs
        .append('path')
        .style('fill', darkWhite)
        .attr('opacity', 0.8)
        .attr('id', 'path1')
        .datum({startAngle: dewToRad(minDew), endAngle: dewToRad(maxDew)})
        .attr('d', backgroundArc)

    /**
     * Dry arc
     */
    dewArcs
        .append('path')
        .style('fill', offWhite)
        .attr('opacity', 0.5)
        .datum({startAngle: dewToRad(minDew), endAngle: dewToRad(dryUpperBound)})
        .attr('d', backgroundArc)

    /**
     * Comfy arc
     */
    dewArcs
        .append('path')
        .style('fill', midWhite)
        .attr('opacity', 0.5)
        .datum({startAngle: dewToRad(dryUpperBound), endAngle: dewToRad(niceUpperBound)})
        .attr('d', backgroundArc)

    dewArcs
        .attr('transform', 'translate(' + dewSvgWidth / 2 + ',' + ( ( dewSvgHeight / 2 ) + 20 ) + ')');


    var labelSize = 14;
    var labelYOffset = -8;

    dewArcs
        .append("text")
        .attr("x", 16)
        .attr("dy", labelYOffset)
        .append('textPath')
        .attr('fill', offWhite)
        .attr('font-size', labelSize + 'px')
        .attr('letter-spacing', '1px')
        .attr('xlink:href','#path1')
        .text('Dry');

    dewArcs
        .append("text")
        .attr("x", 57)
        .attr("dy", labelYOffset)
        .append('textPath')
        .attr('fill', offWhite)
        .attr('font-size', labelSize + 'px')
        .attr('letter-spacing', '.2px')
        .attr('xlink:href','#path1')
        .text('Comfy');

    dewArcs
        .append("text")
        .attr("x", 110)
        .attr("dy", labelYOffset)
        .append('textPath')
        .attr('fill', offWhite)
        .attr('font-size', labelSize + 'px')
        .attr('letter-spacing', '.2px')
        .attr('xlink:href','#path1')
        .text('Muggy');

    /**
     * 20  = -0.25 * tau
     * 80 =  0.25 * tau
     */
    function dewToRad (dewPoint) {
        var tau = 2 * Math.PI;
        var min = minDew;
        var max = maxDew;
        var proportion = (dewPoint - min) / (max - min);
        var halfRadians = ( ( proportion / 2 ) - 0.25 ) * tau;
        return halfRadians;
    }

    /**
     * Dew Point indicator
     */
    var dewPointerGroup = dewSvg.append('g');
    var pointerWidth = 40;
    var pointerHeight = 40;
    var pointerA = [0, 0];
    var pointerB = [(pointerWidth / 2), ((pointerHeight / 2) - 8)];
    var pointerC = [(pointerWidth / 2) + 2, (pointerHeight / 2) + 2];
    var pointerD = [((pointerWidth / 2) - 8), (pointerHeight / 2)];
    var pointerX = (pointerWidth / 2);
    var pointerY = (pointerHeight / 2);
    dewPointerGroup
        .append('polygon')
        .attr('points',function() {
            return pointerA.join(',') + ' ' + pointerB.join(',') + ' ' + pointerC.join(',') + ' ' + pointerD.join(',');
        })
        .style('fill', '#e1d5b6');
        //.attr('stroke', '#9a927d')
        //.attr('stroke-width', 1.5)

    dewPointerGroup
        .attr('transform', function() {
            return 'translate(' + ( dewSvgWidth / 2 ) + ',' + ( dewSvgHeight / 2 ) + ')';
        });

    var dewPoint = d3.select('.' + this.data._id + ' .dew-value').attr('data-dew-point');
    dewPointerGroup
        .attr('transform', function() {
            var translate = 'translate(' +
                ( dewSvgWidth / 2 ) +
                ',' +
                ( ( dewSvgHeight / 2 ) + 19 ) +
                ')';
            var rotate = 'rotate(' + (dewToPointerAngle(dewPoint)) + ',' + 0 + ',' + 0 + ')';
            return translate + ' ' + rotate;
        });

    function dewToPointerAngle (dewPoint) {
        var minDegrees = 135;
        var maxDegrees = 315;
        if (dewPoint < 35) {
            dewPoint = 35;
        }
        if (dewPoint > 80) {
            dewPoint = 80;
        }
        var proportion = ((dewPoint - minDew) / (maxDew - minDew));
        var offsetAngle = (proportion * 180);
        var angle = parseInt(offsetAngle, 10) + parseInt(minDegrees, 10);
        return angle;
    }

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

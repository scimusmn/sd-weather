/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

/+ ---------------------------------------------------- */

Handlebars.registerHelper('thisYear', function(myArgument){
    return new Date().getFullYear();
});

/**
 * Translate Forecast.io icon strings into Eric Flowers' weather icon fonts
 */
Handlebars.registerHelper('translateIcon', function(input) {
    console.log('input - ', input);
    var dictionary = {
        'clear-day': 'wi-day-sunny',
        'clear-night': 'wi-night-clear',
        'rain': 'wi-rain',
        'snow': 'wi-snow',
        'sleet': 'wi-sleet',
        'wind': 'wi-cloudy-gusts',
        'fog': 'wi-fog',
        'cloudy': 'wi-cloudy',
        'partly-cloudy-day': 'wi-day-cloudy',
        'partly-cloudy-night': 'wi-night-cloudy',
    };
    console.log('dictionary.input - ', dictionary[input]);
    return dictionary[input];
});

/**
 * Turn titles into CSS classes
 *
 * Remove puncuation
 * Spaces to undescores
 * Lowercase text
 */
Handlebars.registerHelper('lowerSpacesToDashes', function(input) {
    if (input) {
        return input.replace(/[\.,'-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '').replace(/\s+/g, '-').toLowerCase();
    }
});

/**
 * Format datetime strings
 */
Handlebars.registerHelper('formatDateTime', function(input) {
    return moment.unix(input).format('MM/DD/YYYY, h:mm:ss a');
    //var now = moment.unix(input);
    //return now.calendar();
});

/**
 * Format wind strings
 */
Handlebars.registerHelper('beaufortScale', function(input) {
    var beaufortMaximiums = [1, 3, 7, 12, 17, 24, 30, 38, 46, 54, 63, 73];
    var beaufortNames = [
        'Calm',
        'Light air',
        'Light breeze',
        'Gentle breeze',
        'Moderate breeze',
        'Fresh breeze',
        'Strong breeze',
        'High wind',
        'Gale',
        'Strong gale',
        'Strong gale',
        'Whole gale',
        'Violent storm',
        'Huricane force'
    ];
    // Loop through the Beaufort scalemaximum MPHs
    // until our input is less then a value
    for (var i in beaufortMaximiums) {
        var speed = beaufortMaximiums[i];
        if (speed > input) {
            return beaufortNames[i];
        }
    }
    return beaufortNames[12];
});

/**
 * Format temperature strings
 */
Handlebars.registerHelper('formatTemperature', function(input) {
    return parseInt(input) + '<span class="deg">&deg;</span>';
});

/**
 * Format wind speed strings
 */
Handlebars.registerHelper('formatWindSpeed', function(input) {
    return oneDigit(input) + ' mph';
});

/**
 * Round number to one decimal place
 */
function oneDigit(input) {
    return rounded = Math.round( input * 10 ) / 10;
}

/**
 * Zero to One percent
 */
Handlebars.registerHelper('percentMessage', function(input, suffix, zeroMessage) {
    if (input === 0) {
        return zeroMessage;
    }
    else {
        if (suffix) {
            return decimalToPercent(input)
        }
    }
});

Handlebars.registerHelper('decimalToPercent', function(input) {
    return decimalToPercent(input);
});

function decimalToPercent(input) {
    return oneDigit(input * 100) + '%';
}


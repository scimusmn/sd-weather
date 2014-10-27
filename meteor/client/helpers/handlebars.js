/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

/+ ---------------------------------------------------- */

Handlebars.registerHelper('thisYear', function(myArgument){
    return new Date().getFullYear();
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
    //return moment.unix(input).format('MM/DD/YYYY, H:mma');
    var now = moment.unix(input);
    return now.calendar();
});

/**
 * Format temperature strings
 */
Handlebars.registerHelper('formatTemperature', function(input) {
    // Round to one decimal place
    var rounded = Math.round( input * 10 ) / 10;
    return rounded + '&deg;';
});

/**
 * Zero to One percent
 */
Handlebars.registerHelper('percentMessage', function(input, suffix, zeroMessage) {
    if (input === 0) {
        return zeroMessage;
    }
    else {
        if (suffix) {
            return (input * 100) + '% ' + suffix;
        }
    }
});


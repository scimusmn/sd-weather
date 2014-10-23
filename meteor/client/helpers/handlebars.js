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

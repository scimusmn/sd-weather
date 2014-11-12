/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

/**
 * Weather location
 */
if (Locations.find().count() === 0) {

    Locations.insert({
        _id: 'san-diego',
        order: 0,
        habitat: 'Canyons and Streams',
        title: 'San Diego',
        latitude: '32.732323',
        longitude: '-117.147403'
    });
    Locations.insert({
        _id: 'santa-monica',
        order: 1,
        habitat: 'Coast',
        title: 'Santa Monica',
        latitude: '34.021944',
        longitude: '-118.481389'
    });
    Locations.insert({
        _id: 'temecula',
        order: 2,
        habitat: 'Chaparral',
        title: 'Temecula',
        latitude: '33.503333',
        longitude: '-117.123611'
    });
    Locations.insert({
        _id: 'san-jacinto-peak',
        order: 3,
        habitat: 'Mountains',
        title: 'San Jacinto Peak',
        latitude: '33.814712',
        longitude: '-116.679438'
    });
    Locations.insert({
        _id: 'brawley',
        order: 4,
        habitat: 'Desert',
        title: 'Brawley',
        latitude: '32.978611',
        longitude: '-115.530278'
    });

}

// Fixture data
if (Items.find().count() === 0) {

    Items.insert({
        title: 'Eridanus',
        body: 'Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River.'
    });

    Items.insert({
        title: 'Cassiopeia',
        body: 'Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty.'
    });

    Items.insert({
        title: 'Scorpius',
        body: 'Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac.'
    });

}

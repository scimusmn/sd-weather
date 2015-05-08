# San Diego Current Weather

Current Weather dashboard for the San Diego Natural History Museum's [Coast to 
Cactus exhibit](http://www.sdnhm.org/exhibitions/current-exhibitions/coast-to-cactus-in-southern-california/).

## Tech
sd-weather is a [Meteor](https://www.meteor.com/) application using [D3](http://d3js.org/) for some presentation elements and the [Forecast.io weather API](https://developer.forecast.io/) for data.

The application is specifically designed to run within a fullscreen instance of Chrome on a 1080x1920 32" vertical monitor.

## Setup

### Define application settings
    $ cd meteor/settings
    $ cp settings.default.json settings.json

Edit the settings.json file, defining your Forecast.io API key and how often
you'd like to update the data. Set the frequency using natural language,
based on [a later.js pattern](http://bunkat.github.io/later/parsers.html#text).

The forecast.io API allows us 1000 calls per day for free. We have 5 locations.
Which gives us 200 calls per location per day. If we query every few minutes
that gives us a bit of padding on the API limit.

### Start Meteor

    $ meteor --settings settings/settings.json --port 4000

## Credits
Thanks to:
 * [forecast.io](https://developer.forecast.io/) for the great weather data API
 * forecast.io's [various data sources](http://forecast.io/raw/), especially NOAA for making this information open and accessible
 * Alan Palazolo for his presentation and [code examples](https://github.com/minnpost/minnpost-climate) on the development of MinnPost's climate features.
 * Justin Heideman for his [presentation on the development of the Minnesota Public Radio's weather pages](http://blogs.mpr.org/developer/2014/03/new-weather-pages-for-mpr-news/)
 * [Jonathan Arnaldo's meteorshowers application](https://github.com/jonarnaldo/meteorshowers)
 * [André F's qweather application](https://github.com/andre-f/qweather)
 * [Erik Flower's Weather Icons](https://github.com/erikflowers/weather-icons)

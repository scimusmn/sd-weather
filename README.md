# Simple weather application for San Diego

## Setup

### Define application settings
    $ cd meteor/settings
    $ cp settings.default.json settings.json

Edit the settings.json file, defining your Forecast.io API key and how often
you'd like to update the data. Set the frequency using natural language,
based on [a later.js pattern](http://bunkat.github.io/later/parsers.html#text).

### Start Meteor

    $ meteor --settings settings.json --port 4000

## Tech
* Meteor
* D3

## Credits
Thanks to:
 * [forecast.io](https://developer.forecast.io/) for the great weather data API
 * forecast.io's [various data sources](http://forecast.io/raw/), especially NOAA for making this information open and accessible
 * Alan Palazolo for his presentation and [code examples](https://github.com/minnpost/minnpost-climate) on the development of MinnPost's climate features.
 * Justin Heideman for his [presentation on the development of the Minnesota Public Radio's weather pages](http://blogs.mpr.org/developer/2014/03/new-weather-pages-for-mpr-news/)
 * [Jonathan Arnaldo's meteorshowers application](https://github.com/jonarnaldo/meteorshowers)
 * [André F's qweather application](https://github.com/andre-f/qweather)
 * [Erik Flower's Weather Icons](https://github.com/erikflowers/weather-icons)

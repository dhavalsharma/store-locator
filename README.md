# Store locater
This is a nodejs application which is used to find the closest store and the distance from given locatin by zip or street address. 

## Available endpoints

{server}/closest?zip=<zip>

{server}/closest?address=<address>

{server}/closest?zip=<zip>&units=<(mi|km)>

## Prerequisites 
The development is done on `node v10.16.3`

## Install
Please run command `npm install` to load the dependencies from root folder.

## Test
Please run command `npm test` to test application from root folder.

## Run 
Please run command `npm start` to start application from root folder.

## Background
The shortest distance (great circle distance or as crows flies) between two points on earth is calculated using Haversine's formula as described at this [link](http://www.movable-type.co.uk/scripts/latlong.html).

The reverse geocoding is done using [Nominatim](https://nominatim.org/release-docs/develop/api/Search/) which in turn searches open street mao data for name and address.

## Future Improvements
1. The testing does not yet mock the calls to backend geocoding services.
2. Use cache instead of loading csv in memory and converting it to JSON.

const got = require('got')

//source https://stackoverflow.com/a/27943/119031
const getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

const deg2rad = function (deg) {
    return deg * (Math.PI / 180)
}

const getLatLonFromZip = async (zip) => {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${zip}&format=json`;
    const response = await got(url, {json: true})
    return {lat: response.body[0].lat, lon: response.body[0].lon}
}

const getLatLonFromAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
    const response = await got(url, {json: true})
    return {lat: response.body[0].lat, lon: response.body[0].lon}
}

module.exports = { getDistanceFromLatLonInKm, getLatLonFromZip, getLatLonFromAddress } 
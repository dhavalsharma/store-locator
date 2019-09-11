const csv = require('csvtojson')
const { getDistanceFromLatLonInKm, getLatLonFromZip, getLatLonFromAddress } = require('./geodistance')
let stores = []

const loadJson = async () => {
    stores = stores.length ? stores : await csv().fromFile('../store-locations.csv')
}

const getStoreFrom = (from, units) => {
    let closestStore = null
    let dist = Infinity
    for(let i = 0; i < stores.length ; i++) {
        let store = stores[i]
        let curDist = getDistanceFromLatLonInKm(from.lat, from.lon, store.Latitude, store.Longitude)
        if (curDist < dist) {
            closestStore = store
            dist = curDist
        }
    }
    if(units === 'mi') {
        dist = dist / 1.609
    }
    return {...closestStore, Distance: Number.parseFloat(dist).toFixed(2)}
}

const getClosestStoreByZip = async (zip, units = 'km') => {
    await loadJson()
    const from = await getLatLonFromZip(zip)
    return getStoreFrom(from, units)
}

const getClosestStoreByAddress = async (address, units = 'km') => {
    await loadJson()
    const from = await getLatLonFromAddress(address)
    return getStoreFrom(from, units)
}

module.exports = {getClosestStoreByZip, getClosestStoreByAddress}


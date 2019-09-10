const csv = require('csvtojson')
const { getDistanceFromLatLonInKm, getLatLonFromZip } = require('./geodistance')
let stores = []

const loadJson = async () => {
    stores = stores.length ? stores : await csv().fromFile('../store-locations.csv')
}

const getClosestStoreByZip = async (zip, units = 'km') => {
    await loadJson()
    const from = await getLatLonFromZip(zip)
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
    return closestStore
}

const getClosestStoreByPlace = () => {

}
module.exports = {getClosestStoreByZip, getClosestStoreByPlace}


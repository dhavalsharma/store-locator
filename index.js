const express = require('express')
const querystring = require('querystring')

const app = express()

const {getClosestStoreByZip, getClosestStoreByPlace, getClosestStoreByAddress} = require('./util/csvloader')

app.get('/closest', async (req, res) => {
    const zip = req.query.zip
    const address = req.query.address
    const units = req.query.units || 'km' //or mi for miles
    let store = null

    if((!zip || zip.length === 0) && (!address || address === 0) ) {
        return res.status(400).json({message: `missing or incorrect param zip=${zip} or address=${address}`})
    }

    if (zip) {
        store = await getClosestStoreByZip(zip, units)
    }
    else if (address) {
        store = await getClosestStoreByAddress(querystring.escape(address), units)
    }

    
    res.status(200).json(store)
})

app.listen(3000, () => {
    console.log('server started')
})

module.exports = app
var express = require('express')
var app = express()
const {getClosestStoreByZip, getClosestStoreByPlace} = require('./util/csvloader')

app.get('/closest', async (req, res) => {
    const zip = req.query.zip
    const store = await getClosestStoreByZip(zip)
    res.status(200).json(store)
})

app.listen(3000, () => {
    console.log('server started')
})

module.exports = app
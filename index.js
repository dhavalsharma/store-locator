var express = require('express')
var app = express()

app.listen(3000, () => {
    console.log('server started')
})

module.exports = app
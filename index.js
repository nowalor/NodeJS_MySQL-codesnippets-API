const express = require('express')
require('dotenv').config()

const port = process.env.PORT

const app = express()

app.use('', require('./routes'))


app.listen(5000 ,() => {
    console.log(`Listening on port: ${port}`)
})
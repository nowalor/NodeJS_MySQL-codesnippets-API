const express = require('express')
require('dotenv').config()
const db = require('./database/db.js')


const port = process.env.PORT

const app = express()

app.listen(5000 ,() => {
    console.log(`Listening on port: ${port}`)
})
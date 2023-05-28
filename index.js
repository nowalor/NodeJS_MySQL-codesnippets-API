const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv').config()

const port = process.env.PORT

const app = express()

app.listen(5000 ,() => {
    console.log(`Listening on port: ${port}`)
})
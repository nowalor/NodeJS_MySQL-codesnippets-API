const express = require('express')
require('dotenv').config()

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('', require('./routes'))


app.listen(5000 ,() => {
    console.log(`Listening on port: ${port}`)
})
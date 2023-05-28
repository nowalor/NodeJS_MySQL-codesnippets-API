const express = require('express')
const { storeSnippet } = require('./controllers/snippetController')

const router = express.Router()

router.post('/snippets', storeSnippet)

module.exports = router
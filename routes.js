const express = require('express')
const {check} = require('express-validator')


const {storeSnippet} = require('./controllers/snippetController')

const router = express.Router()

const postSnippetRules = [
    check('language_id').notEmpty().isNumeric(),
    check('snippet').notEmpty().isString()
]

router.post('/snippets', postSnippetRules, storeSnippet)

module.exports = router
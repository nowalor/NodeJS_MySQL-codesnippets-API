const express = require('express')
const {check} = require('express-validator')


const {register, login} = require('./controllers/authController')
const {storeSnippet} = require('./controllers/snippetController')

const router = express.Router()

const loginRules = [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty()
]

const registerRules = [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty()
]

const postSnippetRules = [
    check('language_id').notEmpty().isNumeric(),
    check('snippet').notEmpty().isString()
]

router.post('/auth/login', loginRules, login)
router.post('/auth/register', registerRules, register)
router.post('/snippets', postSnippetRules, storeSnippet)

module.exports = router
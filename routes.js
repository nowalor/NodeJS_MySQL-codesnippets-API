const express = require('express')
const {check} = require('express-validator')


const {register, login, logout} = require('./controllers/authController')
const {storeSnippet, getAllSnippets} = require('./controllers/snippetController')
const  authMiddleware  = require('./middlewares/authMiddleware')

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

// Auth routes
router.post('/auth/login', loginRules, login)
router.post('/auth/register', registerRules, register)
router.post('/auth/logout', authMiddleware,logout)

// Snippet routes
router.get('/snippets', getAllSnippets)
router.post('/snippets', postSnippetRules, authMiddleware, storeSnippet)

module.exports = router
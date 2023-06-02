const db = require('../database/db')
const {validationResult} = require('express-validator')
const {checkIfExists} = require('../helpers/validation')

const getAllSnippets = async (req, res) => {
    const query = 'SELECT * FROM snippets'

    db.query(query, (err, dbRes) => {
        if (err) throw err

        console.log('dbRes', dbRes)

        const data = Object.assign({}, dbRes)

        return res.status(200).json({
            success: true,
            data,
        })
    })
}

const storeSnippet = async (req, res) => {
    const errors = validationResult(req)

    const {language_id, snippet} = req.body

    if (errors.length > 0) {
        return res.status(422).json(errors)
    }

    const validLanguageId = await checkIfExists('languages', language_id)

    if (!validLanguageId) {
        return res.status(404).json({
            success: false,
            message: 'Language not found'
        })
    }

    const userId = req.auth.id

    const query = `INSERT INTO snippets (user_id, language_id, snippet)
                   VALUES (?, ?, ?)`

    const values = [userId, parseInt(language_id), db.escape(snippet)]

    db.query(query, values, (err) => {
        if (err) {
            throw err
        }

       const newSnippet = {
            ...req.body,
           user_id: userId,
       }

        return res.status(201).json({
            success: true,
            snippet: newSnippet,
        })
    })
}

module.exports = {getAllSnippets, storeSnippet}
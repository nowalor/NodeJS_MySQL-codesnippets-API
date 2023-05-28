const db = require('../database/db')
const { validationResult } = require('express-validator')

const checkIfExists = async (table, id) => {
    const query = `SELECT COUNT(*) FROM ${table} WHERE id=${id}`

    const count = await db.query(query, (err, res) => {
        if(err) {
            console.log('err', err)
            throw err
        }

        return Object.assign({}, res[0])['COUNT(*)']
    })

    return count
}

const storeSnippet = async (req, res) => {
    const errors = validationResult(req)

    const {language_id, snippet } = req.body

    if(errors.length > 0) {
        return res.status(422).json(errors)
    }

    const validLanguageId = await checkIfExists('languages', language_id)

    if(!validLanguageId) {
        return res.status(404).json({
            success: false,
            message: 'Language not found'
        })
    }

    const query = `INSERT INTO snippets (language_id, snippet) VALUES(${db.escape(language_id)}, ${db.escape(snippet)})`

    db.query(query, (err, res) => {
        if (err) {
            console.log('err', err)

            res.send('Error')
        }
    })

    return res.send('POST req to snippetController.storeSnippet')
}

module.exports = { storeSnippet }
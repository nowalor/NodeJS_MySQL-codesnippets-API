const db = require('../database/db')
const { validationResult } = require('express-validator')

const checkIfExists = (table, id) => {
    const query = `SELECT COUNT(*) FROM ${table} WHERE id=${id}`

    db.query(query, (req, res) => {
        console.log('res', res)
    })

    return 'hello'
}

const storeSnippet = (req, res) => {
    const errors = validationResult(req)

    const {language_id, snippet } = req.body

    if(errors.length > 0) {
        return res.status(422).json(errors)
    }

    const validLanguageId = checkIfExists('languages', language_id)

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
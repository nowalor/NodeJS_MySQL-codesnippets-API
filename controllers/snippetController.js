const db = require('../database/db')

const storeSnippet = (req, res) => {
    const {language_id, snippet } = req.body
    console.log('language_id', language_id)
    console.log('snippet', snippet)

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
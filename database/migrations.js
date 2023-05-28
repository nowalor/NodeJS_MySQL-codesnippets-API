const db = require('./db.js')

const createLanguagesTable = () => {
    const sql = 'CREATE TABLE IF NOT EXISTS languages(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, res) => {
        if (err) {
            throw err
        }

        console.log('Languages table created')
    })
}

// const seedLanguagesTable = () => {
//     const sql = 'INSERT INTO languages(name) VALUES("TypeScript"),("HTML"),("CSS")'
//
//     db.query(sql, (err, res) => {
//         if (err) {
//             throw err
//         }
//
//         console.log('Languages table seeded')
//     })
// }

const createSnippetsTable = () => {
    const sql = 'CREATE TABLE IF NOT EXISTS snippets(id int AUTO_INCREMENT, language_id int, snippet VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, () => console.log('Snippets table created'))
}

createLanguagesTable()
// seedLanguagesTable()
createSnippetsTable()

db.end()
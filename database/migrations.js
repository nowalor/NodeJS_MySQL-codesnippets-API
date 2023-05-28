const db = require('./db.js')

db.connect()

const createLanguagesTable = () => {
    const sql = 'CREATE TABLE IF NOT EXISTS languages(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, res) => {
        if (err) {
            throw err
        }

        console.log('Languages table created')
    })
}

const seedLanguagesTable = () => {
    const sql = 'INSERT INTO languages(name) VALUES("TypeScript"),("HTML"),("CSS")'

    db.query(sql, (err, res) => {
        if (err) {
            throw err
        }

        console.log('Languages table seeded')
    })
}

createLanguagesTable()
seedLanguagesTable()

db.end()
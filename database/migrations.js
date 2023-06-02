const db = require('./db.js')

const createDatabase = () => {
    const sql = 'CREATE DATABASE IF NOT EXISTS code_snippets'

    db.query(sql, (err, res) => {
        if (err) {
            throw err
        }

        console.log('Database created')
    })
}

const createUsersTable = () => {
    const sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, email VARCHAR(255) UNIQUE, password VARCHAR(255), PRIMARY KEY (id))'

    db.query(sql, (err, res) => {
        if (err) {
            throw err
        }

        console.log('Users table created')
    })
}

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

const createSnippetsTable = () => {
    const sql = 'CREATE TABLE IF NOT EXISTS snippets(id int AUTO_INCREMENT, user_id int, language_id int, snippet VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id))'

    db.query(sql, (err) => {
        if (err) throw err

        console.log('Snippets table created')
    })
}

createDatabase()
createUsersTable()
createLanguagesTable()
seedLanguagesTable()
createSnippetsTable()

db.end()
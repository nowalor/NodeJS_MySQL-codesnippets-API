const db = require("../database/db");
const checkIfExists = async (table, value, field = 'id') => {
    const query = `SELECT COUNT(*)
                   FROM ${table}
                   WHERE ${field} = ?`
    const values = [value]

    const count = await db.query(query, values, (err, res) => {
        if (err) {
            console.log('err', err)
            throw err
        }

        return Object.assign({}, res[0])['COUNT(*)']
    })

    return count
}

module.exports = {checkIfExists}
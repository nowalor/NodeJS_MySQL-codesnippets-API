const db = require("../database/db");
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

module.exports = { checkIfExists }
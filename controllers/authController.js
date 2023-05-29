const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { checkIfExists } = require('../helpers/validation')

const db = require('../database/db')

const register = async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json(errors)
    }

    const { email, password } = req.body

   const isEmailTaken = await checkIfExists('users', email, 'email')

    // console.log('isEmailTaken', isEmailTaken)
    if(isEmailTaken === 1) {
        return res.status(422).json({
            success: false,
            message: "Email has already been taken"
        })
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            throw err
        }
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if(err) {
                throw err
            }

            const query = 'INSERT INTO users(email, password) VALUES (?, ?)'
            const values = [email, hashedPassword]

            db.query(query, values,(err) => {
                if(err) {
                    throw err
                }


                res.status(200).json({
                    success: true,
                    message: "User created"
                })
            })
        })
    })

    return res.send('authController.register')
}

const login = async (req, res) => {
    const { email, password} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors,
        })
    }

    return res.send('end of login controller')
}

module.exports = {register, login}
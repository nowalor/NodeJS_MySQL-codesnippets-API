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

    const query = 'SELECT * FROM users WHERE email = ?';
    const values = [email]

    db.query(query, values, (err, dbRes) => {
        if(err) {
            throw err
        }

        const data = Object.assign({}, dbRes[0])

        const isMatch = bcrypt.compareSync(password, data.password)

        if(!isMatch) {
            return res.status(422).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'User logged in'
        })
    })
}

module.exports = {register, login}
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { registerValidation } from './validations/auth.js'
import { validationResult } from 'express-validator';



mongoose
    .connect('mongodb+srv://admin:root@cluster1.v03ym.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((e) => console.log('DB error', e))


const app = express()

app.use(express.json)

app.post('./auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    } else {
        return res.json({
            success: true,
        })
    }
})


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else { console.log(`SERVER started`) }
})


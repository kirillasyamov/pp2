import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, SECRET_KEY
            , { expiresIn: `24h` })

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `REGISTRATION FAILED`
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                message: `UNSUCCESSFUL`,
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: `WRONG LOGIN OR PASSWORD`,
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, SECRET_KEY
            , { expiresIn: `24h` })

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token,
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `AUTHORIZATION FAILED`,
        })
    }
}

export const getMe = async (req, res) => {
    try {

        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: `USER DOES NOT EXIST`,
            })

        }
        else {
            const { passwordHash, ...userData } = user._doc

            return res.json(userData)
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: `NO ACCESS`,
        })
    }
}


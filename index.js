import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import dotenv from 'dotenv'

import { UserController, PostController } from './controllers/export.js'
import { registerValidation, loginValidation, postingValidation } from './validations.js'
import { handleValidationErrors, checkAuth } from './utils/export.js'

dotenv.config()
const PORT = process.env.PORT
const DB_CONN = process.env.DB_CONN

mongoose
    .connect(DB_CONN)
    .then(() => console.log('DB connected'))
    .catch((e) => console.log('DB error', e));

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/posts', checkAuth, postingValidation, handleValidationErrors, PostController.create)
app.get('/posts/:id', PostController.getOne)
app.get('/posts', PostController.getAll)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postingValidation, handleValidationErrors, PostController.update)

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    } else { console.log(`SERVER started`) }
})
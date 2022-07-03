const SECRETKEY = `abzzaaz`
const PORT = 4444
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

import express from 'express'
import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import mongoose from 'mongoose'
import checkAuth from './utils/checkAuth.js'

mongoose
    .connect('mongodb+srv://admin:root@cluster1.v03ym.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch((e) => console.log('DB error', e));



const app = express()

app.use(express.json())

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.get('/posts/:id', PostController.getOne)
app.get('/posts', PostController.getAll)

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    } else { console.log(`SERVER started`) }
})


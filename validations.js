import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'INCORRECT MAIL FORMAT').isEmail(),
    body('password', 'INCORRECT PASSWORD FORMAT').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'INCORRECT MAIL FORMAT').isEmail(),
    body('password', 'INCORRECT PASSWORD FORMAT').isLength({ min: 5 }),
    body('fullName', 'INCORRECT USERNAME FORMAT').isLength({ min: 3 }),
    body('avatarUrl', 'INCORRECT URL TO AVATAR').optional().isURL(),
]

export const postingValidation = [
    body('title', `ENTER A TITLE`).isLength({ min: 3 }).isString(),
    body('text', `ENTER A POST`).isLength({ min: 10 }).isString(),
    body('tags', `UNEXPECTED FORMAT OF TAGS`).optional().isArray(),
    body('imageUrl', `UNEXPECTED FORMAT OF IMAGINES URL`).optional().isURL(),
]
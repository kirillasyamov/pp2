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
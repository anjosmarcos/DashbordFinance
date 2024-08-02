import { badRequest } from '../helpers/http.js'
import validator from 'validator'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: `Password must be at least 6 characters`,
    })
}

export const emailAlreadyInUseResponse = () => {
    return badRequest({
        message: `Invalid e-mail. Please provide a valid one.`,
    })
}

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided ID is not valid',
    })
}

export const checkIfPasswordValid = (password) => password.length >= 6

export const checkIfEmailValid = (email) => validator.isEmail(email)

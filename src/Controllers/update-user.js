import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../user-cases/index.js'

import {
    checkIfEmailValid,
    checkIfIsValid,
    checkIfPasswordValid,
    emailAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from './helpers/index.js'
export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIsValid()
            if (!isIdValid) {
                invalidIdResponse()
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordValid(params.password)
                if (passwordIsValid) {
                    invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailValid = checkIfEmailValid(params.email)
                if (!emailValid) {
                    emailAlreadyInUseResponse()
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}

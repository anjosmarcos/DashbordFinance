import { CreateUserUseCase } from '../user-cases/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfEmailValid,
    checkIfPasswordValid,
    emailAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
} from './helpers/index.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const passwordIsValid = checkIfPasswordValid(params.password)

            if (passwordIsValid) {
                invalidPasswordResponse()
            }

            const emailValid = checkIfEmailValid(params.email)
            if (!emailValid) {
                emailAlreadyInUseResponse()
            }

            const createUserCase = new CreateUserUseCase()
            const createUser = await createUserCase.execute(params)

            return created(createUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}

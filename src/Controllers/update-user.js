import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserUseCase } from '../user-cases/update-user.js'
import { badRequest, ok, serverError } from './helpers.js'
import validator from 'validator'
export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body
            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)
            if (!isIdValid) {
                return badRequest({
                    message: 'The provided ID is not valid',
                })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field)
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6
                if (passwordIsNotValid) {
                    return badRequest({
                        message: `Password must be at least 6 characters`,
                    })
                }
            }

            if (updateUserParams.email) {
                const emailValid = validator.isEmail(updateUserParams.email)
                if (!emailValid) {
                    return badRequest({
                        message: `Invalid e-maail. Please provide a valid one.`,
                    })
                }
            }

            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams
            )

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

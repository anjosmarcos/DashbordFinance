import { GetUserByIdUserCase } from '../user-cases/get-user-by-id.js'
import { serverError, ok, badRequest } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provider id is not valid.',
                })
            }

            const getUserByIdUserCase = new GetUserByIdUserCase()
            const user = await getUserByIdUserCase.execute(
                httpRequest.params.userId
            )

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

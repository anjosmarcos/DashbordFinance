import { GetUserByIdUserCase } from '../user-cases/get-user-by-id.js'
import { serverError, ok, notFound } from './helpers/http.js'
import { checkIfIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = checkIfIsValid(userId)

            if (!isIdValid) {
                invalidIdResponse()
            }

            const getUserByIdUserCase = new GetUserByIdUserCase()
            const user = await getUserByIdUserCase.execute(
                httpRequest.params.userId
            )

            if (!user) return notFound({ message: 'User not found' })

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

import { GetUserByIdUserCase } from '../user-cases/index.js'
import {
    checkIfIsValid,
    invalidIdResponse,
    serverError,
    ok,
    userNotFoundResponse,
} from './helpers/index.js'

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

            if (!user) return userNotFoundResponse()

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

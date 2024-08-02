import { GetUserByIdUserCase } from '../user-cases/get-user-by-id.js'
import {
    checkIfIsValid,
    invalidIdResponse,
    serverError,
    ok,
    notFound,
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

            if (!user) return notFound({ message: 'User not found' })

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

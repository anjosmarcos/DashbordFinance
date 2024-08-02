import { DeleteUserByIdUserCase } from '../user-cases/delete-users.js'
import {
    checkIfIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isValid = checkIfIsValid(userId)

            if (!isValid) return invalidIdResponse()

            const deleteUserByIdUserCase = new DeleteUserByIdUserCase()
            const deleteUser = await deleteUserByIdUserCase.execute(userId)

            if (!deleteUser) return userNotFoundResponse()

            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

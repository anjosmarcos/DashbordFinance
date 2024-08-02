import { DeleteUserByIdUserCase } from '../user-cases/delete-users'
import {
    checkIfIsValid,
    invalidIdResponse,
    ok,
    serverError,
} from './helpers/index'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isValid = checkIfIsValid(userId)

            if (!isValid) return invalidIdResponse()

            const deleteUserByIdUserCase = new DeleteUserByIdUserCase()
            const deleteUser = await deleteUserByIdUserCase.execute(userId)

            return ok(deleteUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}

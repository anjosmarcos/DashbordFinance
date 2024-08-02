import { PostgresDeleteUser } from '../repositories/postgres/index.js'

export class DeleteUserByIdUserCase {
    async execute(userId) {
        const deleteUserByIdRepository = new PostgresDeleteUser()
        const deleteUser = await deleteUserByIdRepository.execute(userId)

        return deleteUser
    }
}

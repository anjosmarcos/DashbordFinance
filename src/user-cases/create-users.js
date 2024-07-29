import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository as PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email ja esta em uso
        // Gerar ID do user
        const userID = uuidv4()

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // inserir o usuário no bd
        const user = {
            ...createUserParams,
            id: userID,
            password: hashedPassword,
        }

        // chamar o repositório (repository)
        const postgresCreateUserUserRepository =
            new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserUserRepository.execute(user)

        return createUser
    }
}

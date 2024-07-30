import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { PostgresCreateUserRepository as PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postGetUserByEmailRepository = new PostGetUserByEmailRepository()
        const userWithProviderEmail =
            await postGetUserByEmailRepository.execute(createUserParams.email)

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }

        // Gerar ID do user
        const userId = uuidv4()

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // inserir o usuário no bd
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório (repository)
        const postgresCreateUserUserRepository =
            new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserUserRepository.execute(user)

        return createUser
    }
}

import { EmailAlreadyInUseError } from '../errors/user'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'
import { PostGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // se o e-mail estiver sendo atualizado, verificar se esta em uso
        if (updateUserParams.email) {
            const postGetUserByEmailRepository =
                new PostGetUserByEmailRepository()

            const userWithProviderEmail =
                await postGetUserByEmailRepository.execute(
                    updateUserParams.email
                )

            if (userWithProviderEmail) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // se a senha estiver senha atualizada, criptografar
        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10
            )

            user.password = hashedPassword
        }
        // chamar o repository para atualizar o usuário
        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        const updateUser = await postgresCreateUserRepository.execute(
            userId,
            user
        )

        return updateUser
    }
}

import bcrypt from 'bcrypt'

import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    PostGetUserByEmailRepository,
    PostgresUpdateUserRepository,
} from '../repositories/postgres/index.js'

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

            if (userWithProviderEmail && userWithProviderEmail.id !== userId) {
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
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user
        )

        return updateUser
    }
}

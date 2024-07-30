import { CreateUserUseCase } from '../user-cases/create-users.js'
import validator from 'validator'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // validar a requisição (campos obrigatórios e tanho de senha)
            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            // Verifica os campos obrigatórios
            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param ${field}`,
                        },
                    }
                }
            }

            //  Verifica tamanho de senha
            const passwordIsValid = params.password.length < 6
            if (passwordIsValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Password must be at least 6 characters',
                    },
                }
            }

            // verifica email
            const emailValid = validator.isEmail(params.email)
            if (!emailValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage:
                            'Invalid e-maail. Please provide a valid one.',
                    },
                }
            }

            // chamar o use case
            const createUserCase = new CreateUserUseCase()
            const createUser = await createUserCase.execute(params)

            // retornar a resposta para o usuário (status code)
            return {
                statusCode: 201,
                body: createUser,
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'Error server error',
                },
            }
        }
    }
}

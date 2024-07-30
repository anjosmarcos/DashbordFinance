import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/Controllers/create-user.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const createUserResponse = await createUserController.execute(request)

    response.status(createUserResponse.statusCode).json(createUserResponse.body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`)
})

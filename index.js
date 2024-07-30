import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/Controllers/create-user.js'
import { GetUserByIdController } from './src/Controllers/get-user-by-id.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController()

    const createUserResponse = await createUserController.execute(req)

    res.status(createUserResponse.statusCode).json(createUserResponse.body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}`)
})

import 'dotenv/config.js'
import express from 'express'

const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log('Listening in port 8080')
})

const express = require('express')
require('dotenv').config()

const app = express()
const userRoutes = require('./routes/users.js')
const postRoutes = require('./routes/posts.js')
const {errorHandler} = require('./middleware/errorHandler')
app.use( express.json() )

app.use('/api/v1', userRoutes)
app.use('/api/v1/posts', postRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
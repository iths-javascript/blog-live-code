const express = require('express')
require('dotenv').config()

const app = express()
app.use( express.json() )


app.get('/', (req,res) => {
  res.json({message: 'Hello World'})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
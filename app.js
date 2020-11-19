const express = require('express')
const cors = require('cors')
const route = require('./router/index')
const errorhandling = require('./middlewares/errorhandling')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route)
app.use(errorhandling)

app.listen(port, () => {
  console.log('http://localhost:' + port)
})

module.exports = app
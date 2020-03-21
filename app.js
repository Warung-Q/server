if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./router')
const errorHandler = require('./middlewares/errorHandler')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routes)

app.use(errorHandler)

module.exports = app

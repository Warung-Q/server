if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./router')
const errorHandler = require('./middlewares/errorHandler')
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.json())
app.use(cors())
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.get('/', (req, res) => {
  res.send('home')
})

app.use('/', routes)
app.use(errorHandler)


module.exports = app

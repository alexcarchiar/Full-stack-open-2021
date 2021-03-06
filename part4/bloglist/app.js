const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const Blog = require('./models/blog')
logger.info(`Connecting to database`)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)


app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
  })
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
/*const testingRouter = require('./controllers/testing')
app.use('/api/testing', testingRouter)*/

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const Blog = require('./models/blog')
logger.info(`Connecting to database`)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)


app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
  })
app.use('/api/blogs', blogsRouter)
/*app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('build'))
morgan.token('post', (request) => {
  if (request.method === 'POST')
    return JSON.stringify(request.body)
  else
    return ''
})
morgan.format('postFormat', ':method :url :status :res[content-length] - :response-time ms :post')
app.use(morgan('postFormat'))
const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
const Person = require('./models/person')
const password = "fullstack"
const url =
  `mongodb+srv://fullstack:${password}@cluster0.zojao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  mongoose.connect(url)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  app.use(errorHandler)

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1><a href="/api/phonebook">click here for phonebook api</a>')
})
  
app.get('/api/phonebook', (request, response) => {
  Person.find({}).then( people => {
    phonebook = people
    response.json(phonebook)
  })
})

app.get('/api/phonebook/:id', (request, response) => {
  Person.findById(request.params.id).then(p => {
    if(p){
      response.json(p)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.get('/info', (request, response) => {
    let numPeople = phonebook.length
    Person.find({}).then( people => {
      phonebook = people
    })
    let htmlString = '<p>Phonebook has info for ' + numPeople + ' people</p><p>' + new Date() + '</p>'
    response.send(htmlString)
})

app.delete('/api/phonebook/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
  
})

app.put('/api/phonebook/:id', (request, response) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(err => next(err))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  /*
  if(!body.name){
      response.status(400)
      return response.json({error: 'need a name'}).end()
  } else if(!body.number){
    response.status(400)
    return response.json({error: 'need a number'}).end()
  } else if(phonebook.find(e => e.name === body.name)){
    response.status(400)
    return response.json({error: 'need a unique name'}).end()
  }*/
  const person = new Person({
      name: body.name,
      number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(err => next(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
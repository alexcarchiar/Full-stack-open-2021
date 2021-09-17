const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
//app.use(morgan('combined'))
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
    response.json(phonebook)

  })

  app.get('/api/phonebook/:id', (request, response) => {
      const id = Number(request.params.id)
      const person = phonebook.find(e => e.id === id)
      if(!person){
          response.status(404).end
      }
      response.json(person)
  })

  app.get('/info', (request, response) => {
      const numPeople = phonebook.length
      let htmlString = '<p>Phonebook has info for ' + numPeople + ' people</p><p>' + new Date() + '</p>'
      response.send(htmlString)
  })

  app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(e => e.id !== id)
    response.status(204).end()
  })
  
  app.put('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    let person = phonebook.find(e => e.id === id)
    person.number = request.body.number
    response.json(person)
    response.status(400)
  })

  app.post('/api/persons', (request, response) => {
    let newId = Math.floor(Math.random() * 10000)
      while(phonebook.find(e => e.id === newId)){
        newId = Math.floor(Math.random() * 10000)
      }

      const body = request.body
      if(!body.name){
          response.status(400)
          return response.json({error: 'need a name'}).end()
      } else if(!body.number){
        response.status(400)
        return response.json({error: 'need a number'}).end()
      } else if(phonebook.find(e => e.name === body.name)){
        response.status(400)
        return response.json({error: 'need a unique name'}).end()
    }
      const person = {
          id: newId,
          name: body.name,
          number: body.number
      }

      phonebook = phonebook.concat(person)
      response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
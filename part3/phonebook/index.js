const express = require('express')
const app = express()

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
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
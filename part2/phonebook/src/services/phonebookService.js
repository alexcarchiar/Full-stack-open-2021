import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export default { 
    getAll: getAll, 
    create: create, 
    update: update 
  }
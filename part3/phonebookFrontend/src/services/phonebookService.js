import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/phonebook'
//const personsUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'https://boiling-gorge-85718.herokuapp.com/api/phonebook'
const personsUrl = 'https://boiling-gorge-85718.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(personsUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const deleting = (id) => {
      const request = axios.delete(`${baseUrl}/${id}`)
      return request.then(response => response.data)
  }

export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    deleting: deleting
  }
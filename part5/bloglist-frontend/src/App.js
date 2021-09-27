import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorClass('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const greetUser = () => (
    <p>Hello {user.name}</p>
  )

  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage} className={errorClass}/>
      {user === null ?
      loginForm() :
      <div>
        {greetUser()}
      </div>
    }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
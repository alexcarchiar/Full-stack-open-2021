import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import ErrorMessage from './components/ErrorMessage'
import './index.css';
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('successfull')
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setErrorClass('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleNewBlog = async (blObj) => {
    blogFormRef.current.toggleVisibility()
    if (
      blObj.title !== "" &&
      blObj.author !== "" &&
      blObj.url !== ""
    ) {
      const newBlog = await blogService.create(blObj)
      setErrorMessage('success adding the blog')
      setErrorClass('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
    } else {
        setErrorMessage('Error adding the blog')
        setErrorClass('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }

    console.log('adding new blog')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Problem loggin out')
      setErrorClass('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
    <div>
      <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    </div>      
  )}

  
  const greetUser = () => (
    <div>
      Hello {user.name} <button onClick={handleLogout}>log out</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm 
          createBlog={handleNewBlog}
        />
      </Togglable>
    </div>
  )

  const putFunction = async (id, newBlog) => {
    await blogService.update(id, newBlog)
    console.log(newBlog)
    const updatedBlog = {
      ...newBlog,
      id
    }
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

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
        <Blog key={blog.id} blog={blog} putFunction={putFunction}/>
      )}
    </div>
  )
}

export default App
import React from 'react'
import Togglable from './Togglable'

const Blog = ( { blog, putFunction, deleteFunction }) => {

  const handleClick = async () => {
    const newBlog = { ...blog,
      likes: blog.likes+1
    }
    putFunction(blog.id, newBlog)
  }

  const handleRemove = async () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && deleteFunction(blog.id)
  }

  return(
    <div className='blog'>
      <p>{blog.title} {blog.author}</p>
      <Togglable buttonLabel={'View'}>
        <p>{blog.url}</p>
        <p>{blog.likes}<button className='Like' onClick={handleClick}>Like</button></p>
        <button onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  )}

export default Blog
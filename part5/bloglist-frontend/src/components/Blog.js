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
      <p className='titleAndAuthor'>{blog.title} {blog.author}</p>
      <Togglable buttonLabel={'View'}>
        <p>{blog.url}</p>
        <p id='numLikes'>{blog.likes}<button className='Like' onClick={handleClick}>Like</button></p>
        <button id='remove' onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  )}

export default Blog
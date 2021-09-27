import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, putFunction, deleteFunction}) => {
  
  const handleClick = async () => {
    const newBlog = {...blog,
      likes: blog.likes+1
    }
    putFunction(blog.id, newBlog)
  }
  
  const handleRemove = async () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && deleteFunction(blog.id)
  }

  return(
  <div>
    {blog.title}
    <Togglable buttonLabel={"view"}>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={handleClick}>like</button></p>
      <p>{blog.author}</p>
      <button onClick={handleRemove}>remove</button>
    </Togglable>
  </div>  
)}

export default Blog
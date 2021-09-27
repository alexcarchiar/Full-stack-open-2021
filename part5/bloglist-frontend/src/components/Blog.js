import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, putFunction}) => {
  
  const handleClick = async () => {
    const newBlog = {...blog,
      likes: blog.likes+1
    }
    putFunction(blog.id, newBlog)
  }

  return(
  <div>
    {blog.title}
    <Togglable buttonLabel={"view"}>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={handleClick}>like</button></p>
      <p>{blog.author}</p>
    </Togglable>
  </div>  
)}

export default Blog
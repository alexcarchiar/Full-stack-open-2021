import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {
  return(
  <div>
    {blog.title}
    <Togglable buttonLabel={"view"}>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={null}>like</button></p>
      <p>{blog.author}</p>
    </Togglable>
  </div>  
)}

export default Blog
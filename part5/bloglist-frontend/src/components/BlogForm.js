import React, { useState } from 'react'

function BlogForm({
  createBlog
}) {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewBlogUrl(event.target.value)
  }


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={newBlogTitle}
            onChange={handleTitleChange} />
        </div>
        <div>
          author
          <input
            value={newBlogAuthor}
            onChange={handleAuthorChange} />
        </div>
        <div>
          url
          <input
            value={newBlogUrl}
            onChange={handleUrlChange} />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default BlogForm
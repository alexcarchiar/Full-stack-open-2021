import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

test('renders content', () => {
  const blog = {
    url: 'example.com',
    title: 'My blog',
    author: 'alexcarchiar',
    likes : 10
  }

  const component = render(<Blog blog={blog}/>)
  expect(component.container).toHaveTextContent(
    'example.com'
  )
  expect(component.container.user).toBeUndefined()
  expect(component.container.likes).toBeUndefined()
})

test('renders likes when view button is pressed', () => {
  const blog = {
    url: 'example.com',
    title: 'My blog',
    author: 'alexcarchiar',
    likes : 10
  }

  const component = render(<Blog blog={blog} />)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)

  const contentHiddenByDefault = component.container.querySelector('.hiddenByDefault')
  expect(contentHiddenByDefault).toHaveStyle('display: none')
  expect(contentHiddenByDefault).not.toBeVisible()
})

test('testing like button', () => {
  let component
  let sampleBlog = {
    title: 'Testing React Project With Jest',
    author: 'Jhon Doe',
    url: 'https://example.com/test',
    likes: 2,
    user: '606f2ec415917a37c0b3732f',
  }

  let mockHandler = jest.fn()
  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })
  component = render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
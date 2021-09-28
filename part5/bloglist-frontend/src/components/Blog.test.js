import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
  const blog = {
    url: 'example.com',
    title: 'My blog',
    author: 'alexcarchiar',
    likes : 10
  }
  const likeMockHandler = jest.fn()


  const component = render(<Blog blog={blog} />)
  const viewButton = component.container.querySelector('.View')
  expect(viewButton).toBeDefined()
  fireEvent.click(viewButton)

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})
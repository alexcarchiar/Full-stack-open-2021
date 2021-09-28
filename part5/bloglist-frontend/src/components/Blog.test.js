import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
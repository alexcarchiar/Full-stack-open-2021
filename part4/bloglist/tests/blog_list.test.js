const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Testing /api/blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
})

test('Testing that the blog posts have unique ids', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
})


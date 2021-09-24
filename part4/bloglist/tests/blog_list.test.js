const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Testing /api/blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
})
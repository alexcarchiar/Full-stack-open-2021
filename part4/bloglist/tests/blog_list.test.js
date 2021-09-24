const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
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

test('Testing post /api/blogs', async () => {
    let response = await api.get('/api/blogs')
    const initialNumber = response.body.length
    expect(initialNumber).toBe(4)
    const newBlog = new Blog({
        title: "Bitcoin",
        author: "alexcarchiar",
        url: "bitcoin.org",
        likes: 10
    })
    await newBlog.save()
    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialNumber+1)
})
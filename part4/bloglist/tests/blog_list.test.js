const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../models/user')

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
    const loginUser = {
        username: 'test',
        password: 'secret'
      }
  
      const loggedUser = await api
        .post('/api/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)
  
      const newBlog = {
        title: 'Bitcoin',
        author: 'Satoshi',
        url: 'https://bitcoin.org/',
        likes: 4
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const responseGet = await api.get('/api/blogs')
      const blogs = responseGet.body
      expect(blogs).toHaveLength(6)
  
})

test('Testing default to zero of a property', async () => {
    const loginUser = {
        username: 'test',
        password: 'secret'
      }
  
      const loggedUser = await api
        .post('/api/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)
  
      const newBlog = {
        title: 'Ethereum',
        author: 'lorcalhost',
        url: 'https://ethereum.org/'
      }
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${loggedUser.body.token}`)

      expect(response.body.likes).toBe(0)
})

test('Testing missing properties', async () => {
    const loginUser = {
        username: 'test',
        password: 'secret'
      }
  
      const loggedUser = await api
        .post('/api/login')
        .send(loginUser)
        .expect('Content-Type', /application\/json/)
  
      const newBlog = {
        title: 'litecoin',
        author: 'salvo'
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${loggedUser.body.token}`)
        .expect(400)
})
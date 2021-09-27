const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")

test('testing short password', async () => {

    await api.post('/api/users').send({
        "username": "woo", 
        "name": "Alessandro", 
        "password": "12"
    }).expect(404)
})

test('testing short username', async () => {

    await api.post('/api/users').send({
        "username": "wo", 
        "name": "Alessandro", 
        "password": "1234"
    }).expect(404)
})

test('new user', async () => {

    await api.post('/api/users').send({
        "username": "wooo", 
        "name": "Alessandro", 
        "password": "1234"
    }).expect(200)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(2)
})
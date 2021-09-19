const blog = require('../models/blog')
const Blog = require('../models/blog')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(element => {
        sum = sum + element.likes
    });
    return sum
}

module.exports = {
    dummy,
    totalLikes
}
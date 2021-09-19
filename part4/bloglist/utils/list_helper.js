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

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach(el => {
        if(favorite.likes < el.likes){
            favorite = el
        }
    })
    return favorite;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
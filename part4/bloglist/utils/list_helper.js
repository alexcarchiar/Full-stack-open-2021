const blog = require('../models/blog')
const Blog = require('../models/blog')
const lodash = require('lodash')
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
    return favorite
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  let authorsByBlogs = lodash.countBy(blogs, "author")
  console.log(authorsByBlogs)
  const blogsNumber = Object.values(authorsByBlogs).sort((a, b) => b - a)
  const mostAuthor = Object.keys(authorsByBlogs).sort(
    (a, b) => authorsByBlogs[b] - authorsByBlogs[a]
  )

  const mostBlogsObject = { 
    author: mostAuthor[0],
    blogs: blogsNumber[0]
  }

  return mostBlogsObject
}

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const reducer = (accumulator, blog) => {
        if(accumulator[blog.author] === undefined){
            return { ...accumulator, [blog.author]: blog.likes }
        } else {
           return { ...accumulator, [blog.author]: accumulator[blog.author] + blog.likes }
        }
    }
  
    const likes = blogs.reduce(reducer, {});
    const mostLikedAuthor = Object.keys(likes).sort(
      (a, b) => likes[b] - likes[a]
    )[0];
  
    const mostLikesObject = {
      author: mostLikedAuthor,
      likes: likes[mostLikedAuthor],
    };
  
    return mostLikesObject;
  };

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
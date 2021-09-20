const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            "title": "Alessandro Chiarelli",
            "author": "alexcarchiar",
            "url": "alessandrochiarelli.com",
            "likes": 10,
            "id": "614642944c2d68b8ac8dd311"
          },
          {
            "title": "Lorenzo Callegari",
            "author": "lorcalhost",
            "url": "lorcalhost.com",
            "likes": 10,
            "id": "61465e591293c958022e01f4"
          },
          {
            "title": "Apple",
            "author": "Steve Jobs",
            "url": "apple.com",
            "likes": 100,
            "id": "6146607f8d295c0be577a26e"
          },
          {
            "title": "Canonical string reduction",
            "author": "Edsger W. Dijkstra",
            "url": "dijkstra.com",
            "likes": 12,
            "id": "6146f8483ce6a17d5f6c9689"
          }
      ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toBe(listWithOneBlog[0])
    })

    test('checking with long list', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toBe(listWithManyBlogs[3])
      })
  })

  describe('mostBlogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            "title": "Alessandro Chiarelli",
            "author": "alexcarchiar",
            "url": "alessandrochiarelli.com",
            "likes": 10,
            "id": "614642944c2d68b8ac8dd311"
          },
          {
            "title": "Lorenzo Callegari",
            "author": "lorcalhost",
            "url": "lorcalhost.com",
            "likes": 10,
            "id": "61465e591293c958022e01f4"
          },
          {
            "title": "Apple",
            "author": "Steve Jobs",
            "url": "apple.com",
            "likes": 100,
            "id": "6146607f8d295c0be577a26e"
          },
          {
            "title": "Canonical string reduction",
            "author": "alexcarchiar",
            "url": "dijkstra.com",
            "likes": 12,
            "id": "6146f8483ce6a17d5f6c9689"
          }
      ]

      const result1 = {
          author: "Edsger W. Dijkstra",
          blogs: 1
      }

      const result2 = {
          author: "alexcarchiar",
          blogs: 2
      }

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toBe(result1)
    })

    test('long list', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toBe(result2)
      })
  })

  describe('most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    const listWithManyBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            "title": "Alessandro Chiarelli",
            "author": "alexcarchiar",
            "url": "alessandrochiarelli.com",
            "likes": 10,
            "id": "614642944c2d68b8ac8dd311"
          },
          {
            "title": "Lorenzo Callegari",
            "author": "lorcalhost",
            "url": "lorcalhost.com",
            "likes": 10,
            "id": "61465e591293c958022e01f4"
          },
          {
            "title": "Apple",
            "author": "Steve Jobs",
            "url": "apple.com",
            "likes": 100,
            "id": "6146607f8d295c0be577a26e"
          },
          {
            "title": "Canonical string reduction",
            "author": "alexcarchiar",
            "url": "dijkstra.com",
            "likes": 12,
            "id": "6146f8483ce6a17d5f6c9689"
          }
      ]

      const result1 = {
          author: "Edsger W. Dijkstra",
          likes: 5
      }

      const result2 = {
        author: "Steve Jobs",
        likes: 100
      }

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toBe(result1)
    })

    test('long list', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toBe(result2)
      })
  })
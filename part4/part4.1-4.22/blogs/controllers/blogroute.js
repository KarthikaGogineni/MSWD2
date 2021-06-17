const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// ...


  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

blogRouter.get('/', async (request, response) => {

  const blogs = await Blog
  .find({}).populate('users',{ username:1,name:1})

  response.json(blogs.map(u => u.toJSON()))

  })
  blogRouter.post('/', async (request, response) => {
    const body= request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      users: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  })

  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })
  
  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const updatedBlog = {
      likes: body.likes,
    }
  
    const res = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
      new: true,
    })
    response.json(res)
  })


  module.exports = blogRouter
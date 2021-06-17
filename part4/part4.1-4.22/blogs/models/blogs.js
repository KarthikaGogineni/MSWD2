const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    users: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  })

blogSchema.set('toJSON', {
    transform: (returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const Blog = mongoose.model('blogs', blogSchema)

module.exports = Blog
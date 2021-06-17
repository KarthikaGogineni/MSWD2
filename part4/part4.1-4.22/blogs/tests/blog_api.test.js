const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const api = supertest(app)

jest.setTimeout(600000);

const blogsDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}
const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
]
beforeEach(async () => {
  await Blog.deleteMany({})
	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})
describe('when there is initially some blogs saved', () => {
test('blogs are returned as json', async () => {
   const res= await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

   expect(res.body).toHaveLength(initialBlogs.length)

  }) 

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'TDD harms architecture'
  )
})


describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await blogsDb()

    const blogToView = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blogToView._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(result.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await api.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})
describe('addition of a new blog', () => {
test('a new blog is added', async () => {
	const newBlog = {
		title: 'Theory of Everything',
		author: 'John Tam',
		url: 'http://blog.tam.com/theory/',
		likes: 20,
	}

	await api.post('/api/blogs').send(newBlog).expect(201)

	const response = await api.get('/api/blogs').expect(200)

	expect(response.body).toHaveLength(initialBlogs.length + 1)

  const contents = response.map(n => n.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('fails with status code 400 if data invalid', async () => {
  const newBlog = {
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await blogsDb()

  expect(blogsAtEnd).toHaveLengtht(initialNotes.length)
})

})

describe('deletion of a note', () => {
test('delete a blog', async () => {
	const deleteblog = {
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	}

	await api.delete(`/api/blogs/${deleteblog._id}`).expect(204)

	
  const blogsAtStart = await blogsDb()
  const blogsToDelete = blogsAtStart[0]
  const blogsAtEnd = await blogsDb()


	expect(blogsAtEnd.length).toBe(initialBlogs.length-1)

  const contents = blogsAtEnd.map(r => r.content)

  expect(contents).not.toContain(blogsToDelete.content)
})
})
})
  afterAll(() => {
    mongoose.connection.close()
  })
require('dotenv').config()
const express=require('express')
const morgan = require('morgan')
const cors = require('cors')
const app=express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

const Person=require('./models/person.js')




const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

app.get('/persons',(request,response)=>{
  Person.find({}).then(persons=>{
    response.json(persons)
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

app.get('/info',(request,response)=>{
  const date=new Date()
  response.send(`<p>PhoneBook has info for ${Person.length+1} people</p>
                  <p>${date}</p>`)
})

app.get('/persons/:id',(request,response,next)=>{
  Person.findById(request.params.id)
  .then(person=>{
      person?response.json(person):
      response.status(404).send(`<h1>${response.statusCode} The requested resource was not found.</h1>`)
    })
    .catch(error => next(error)) 
})
app.delete('/persons/:id',(request,response)=>{
  const id=request.params.id
  const people=Person.findByIdAndDelete(id)
  .then(person=>{
      person?response.status(204).json(person):
      response.status(404).send(`<h1>${response.statusCode} The requested resource was not found.</h1>`)
    })
    .catch(error => next(error)) 
  })

app.put('/persons/:id', (request, response) => {
  const { content, number } = request.body

  const person = {
    content,
    number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))

})



app.post('/persons' , (request,response,next) => {
  const { content, number } = request.body

  if (!content || !number) {
    return response.status(400).json({ error: 'missing name or number' })
  }

  const person = new Person({
    content,
    number
  })

  person.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormatted => {
    response.json(savedAndFormatted)
  }) 
    .catch(error =>next(error.message))

})


const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Database running on port ${PORT}`)
})
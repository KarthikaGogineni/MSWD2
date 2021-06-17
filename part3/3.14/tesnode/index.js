const express=require('express')
require('dotenv').config()
const morgan = require('morgan')
const app=express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

const Person=require('./models/person.js')


app.get('/persons',(request,response)=>{
  Person.find({}).then(persons=>{
    response.json(persons)
  })
})

app.get('/info',(request,response)=>{
  const date=new Date()
  response.send(`<p>PhoneBook has info for ${Persons.length} people</p>
                  <p>${date}</p>`)
})
app.get('/persons/:id',(request,response)=>{
  Person.findById(request.params.id)
  .then(person=>
    {person?response.json(person):
      response.status(404).send(`<h1>${response.statusCode} The requested resource was not found.</h1>`)})

  
})
app.delete('/persons/:id',(request,response)=>{
  const id=request.params.id
  const people=Person.findByIdAndDelete(id)
  .then(person=>
    {person?response.status(204).json(person):
      response.status(404).send(`<h1>${response.statusCode} The requested resource was not found.</h1>`)})
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
})

app.post('/persons' , (request,response) => {
  const { content, number } = request.body

  if (!content || !number) {
    return response.status(400).json({ error: 'missing name or number' })
  }

  const person = new Person({
    content,
    number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })

})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Database running on port ${PORT}`)
})
const express=require('express')
const app=express()

   const  persons= [
      {
        "content": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "content": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "content": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "content": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

const PORT=3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
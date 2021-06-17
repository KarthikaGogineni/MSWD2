const mongoose=require('mongoose')
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url=
`mongodb+srv://FULLSTACKOPEN2021:MyPassword@cluster0.kmnjc.mongodb.net/PhoneBook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema=new mongoose.Schema({
  content:String,
  number:String,

})

const Person=mongoose.model('Person',personSchema)

   Person.find({}).then(response=>{
       
    console.log('Phonebook:')
    response.forEach(person=>
      console.log(`${person.content}  ${person.number}`))
    mongoose.connection.close()
    
   }) 
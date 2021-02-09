var express = require('express')
var app = express()

const port = 3001

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]


app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/info', (req, res) => {
  const entries = persons.length

  res.send(`
    <p>Phonebook has entries for ${entries} people</p>
    <p>${Date()}</p>
  `)
  
})

app.listen(port, () => {
  console.log(`Phonebook server listening at http://localhost:${port}`)
})
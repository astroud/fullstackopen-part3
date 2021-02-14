const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const MORGAN_FORMAT = (tokens, req, res) => {
  const body = req.method === 'POST'
                ? JSON.stringify(req.body)
                : ''
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    body
  ].join(' ')
}

app.use(morgan(MORGAN_FORMAT))

const port = process.env.PORT || 3001

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

const generateId = () => {
  return Date.now()
}

app.get('/info', (req, res) => {
  const entries = persons.length

  res.send(`
    <p>Phonebook has entries for ${entries} people</p>
    <p>${Date()}</p>
  `)
  
})

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  let entry = persons.filter( person => person.id === id)

  if (entry.length === 0) {
    return res.status(404).json({ 
      error: 'person not found' 
    })
  }
  
  res.json(entry)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const numberOfEntries = persons.length

  persons = persons.filter(person => person.id !== id)
  
  if(numberOfEntries === persons.length) {
    return res.status(404).json({ 
      error: 'entry already deleted' 
    })
  }

  res.json({ 
    success: 'entry deleted' 
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const existingNames = persons.map(person => person.name.toLowerCase()) 

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if (!body.number) {
    return res.status(400).json({ 
      error: 'phone number missing' 
    })
  }
  else if (existingNames.includes(body.name.toLowerCase())) {
    return res.status(400).json({ 
      error: 'entry already exists with that name' 
    })
  }

  body.id = generateId()
  persons = persons.concat(body)
  res.status(200).json({
    "success": true
  })
})

app.listen(port, () => {
  console.log(`Phonebook server listening at http://localhost:${port}`)
})
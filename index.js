require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const Entry = require('./models/entry')


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


app.get('/info', (req, res) => {
  Entry.countDocuments({}, function (err, count) {
    res.send(`
    <p>Phonebook has entries for ${count} people</p>
    <p>${Date()}</p>
    `)
  });
})

app.get('/api/persons', (req, res) => {
  Entry.find({}).then(entry => {
    res.json(entry)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Entry.findById(req.params.id).then(entry => {
    res.json(entry)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Entry.deleteOne({_id: req.params.id}).then(code => {
    console.log(`Deleting ${req.params.id} !`)
    res.json(code)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

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
  
  const entry = new Entry({
    name: body.name,
    number: body.number,
  })

  entry.save().then(savedEntry => {
    res.json(savedEntry)
  })
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Phonebook server listening at http://localhost:${port}`)
})
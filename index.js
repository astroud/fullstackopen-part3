require('dotenv').config()
const express = require('express')

const app = express()
const morgan = require('morgan')
const Entry = require('./models/entry')

app.use(express.static('build'))
app.use(express.json())

const MORGAN_FORMAT = (tokens, request, response) => {
  const body = request.method === 'POST'
    ? JSON.stringify(request.body)
    : ''
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    body,
  ].join(' ')
}

app.use(morgan(MORGAN_FORMAT))

app.get('/info', (request, response, next) => {
  Entry.countDocuments({}, (error, count) => {
    if (error) {
      next(error)
    }

    response.send(`
    <p>Phonebook has entries for ${count} people</p>
    <p>${Date()}</p>
    `)
  })
})

app.get('/api/persons', (request, response, next) => {
  Entry.find({})
    .then((entry) => {
      response.json(entry)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.deleteOne({ _id: request.params.id })
    .then((code) => {
      console.log(`Deleting ${request.params.id} !`)
      response.json(code)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { body } = request

  const entry = new Entry({
    name: body.name,
    number: body.number,
  })

  entry.save()
    .then((savedEntry) => {
      response.json(savedEntry)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request

  const entry = {
    name: body.name,
    number: body.number,
  }

  const options = { new: true, runValidators: true, context: 'query' }

  Entry.findByIdAndUpdate(request.params.id, entry, options)
    .then((updatedEntry) => {
      response.json(updatedEntry)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(422).send({ error: `${error.message}` })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Phonebook server listening at http://localhost:${port}`)
})

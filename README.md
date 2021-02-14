# fullstackopen-phone-backend

The backend for [Full Stack Open 2021's](https://fullstackopen.com/en) phone directory.

This repo is one of several solutions for my [Full Stack Open 2021's](https://fullstackopen.com/en) course. You can find the rest of my solutions [here](https://github.com/astroud/fullstackopen). The phone directory's current stats can be accessed at: [https://fullstackphone.herokuapp.com/info](https://fullstackphone.herokuapp.com/info)

## API

### All phone directory entries
`https://fullstackphone.herokuapp.com/api/persons`

### Look up a single entry by id
`http://localhost:3001/api/persons/1`


### Delete a single entry by id
`DELETE http://localhost:3001/api/persons/1`

### Save a new contact
```
POST http://localhost:3001/api/persons HTTP/1.1
content-type: application/json

{
  "name": "first last",
  "number": "555-555-5555"
}
```

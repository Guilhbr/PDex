const express = require('express')
const api = require('./api')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Please select your pokemon')
})

app.get('/:name', api.getPokemon)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const express = require('express')
const api = require('./api')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler())

app.get('/', (req, res) => {
    res.send({})
})

app.get('/:name', api.getPokemon)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
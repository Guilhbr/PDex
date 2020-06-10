const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Please select your pokemon')
})

app.get('/:name', (req, res) => {
    console.log(req.params)
    res.send(`your favorite pokemon ${req.params.name}`)})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
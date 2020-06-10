const axios = require('axios')

function findAndSanitizeEntry(entries) {
  const entry = entries.find(e => e.language.name === 'en')
  // replace \n and \f characters with spaces
  return flavor = entry['flavor_text'].replace(/\n|\f/g, ' ')
}

exports.getPokemon = function (req, res) {
  axios(`https://pokeapi.co/api/v2/pokemon-species/${req.params.name}`)
    .then(response => {
      if (response.data) {
        var output = {name: response.data.name}
        const description = findAndSanitizeEntry(response.data.flavor_text_entries)
        output.description = description
        res.send(output)
        // axios.post('https://api.funtranslations.com/translate/shakespeare.json',
        //     {text: flavor}
        // ).then(newText => {
        //     if (newText.data) {
        //         const finalDesc = newText.data.contents.translated
        //         output.description = finalDesc
        //         console.log(newText.data)
        //         console.log(output)
        //         res.send(output)
        //     }
        // })
        // .catch(err => {
        //     console.log(err)
        //     res.send(flavor)
        // })
    } else res.send('Pokemon not found')
  })
  .catch(err => {
    console.log(err)
    res.send('Pokemon not found')
  })
}
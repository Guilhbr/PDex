const axios = require('axios')

function findAndSanitizeEntry(entries) {
  const entry = entries.find(e => e.language.name === 'en')
  // replace \n and \f characters with spaces
  return flavor = entry['flavor_text'].replace(/\n|\f/g, ' ')
}

function getPokemonDesc (name) {
  return axios(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(response => {
      const description = findAndSanitizeEntry(response.data.flavor_text_entries)
      return {name: response.data.name, description}
    })
}

function getTranslation (desc) {
  return axios.post('https://api.funtranslations.com/translate/shakespeare.json',
    {text: desc}
  ).then(response => {
    return response.data.contents.translated
  })
}

exports.getPokemon = async (req, res, next) => {
  const name = req.params.name.toLowerCase()
  try {
    let pokemon = await getPokemonDesc(name, next)
    try {
      pokemon.description = await getTranslation(pokemon.description, next)
      res.send(pokemon)
    } catch(error) { next(error) }
  } catch (error) { next(error) }
}
const axios = require('axios')
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

// Find first english entry and replace \n and \f characters with spaces
function findAndSanitizeEntry(entries) {
  const entry = entries.find(e => e.language.name === 'en')
  return flavor = entry['flavor_text'].replace(/\n|\f/g, ' ')
}

// Check if pokemon is cached, if not call the pokemon api to find its description
function getPokemonDesc (name) {
  const cached = cache.get(name)
  if (cached) {
    return cached;
  }
  return axios(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(response => {
      const description = findAndSanitizeEntry(response.data.flavor_text_entries)
      const pokemon = {name: response.data.name, description}
      cache.set(name, pokemon, 86400) //24 hours
      return pokemon
    })
}

// Calls shakespeare translation API to translate pokemon description
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
    } catch(error) { 
      res.status(error.response.status).send('Error translating description.') 
      next(error)
    }
  } catch (error) { 
    res.status(error.response.status).send('Error finding pokemon.') 
    next(error)
  }
}
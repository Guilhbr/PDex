# PDex

An api that converts your favorite pokemon's description into a Shakesperean classic. It uses the [PokéAPI](https://pokeapi.co/) and [Shakespeare translator](https://funtranslations.com/api/shakespeare) to make this possible.

## Setting Up

### With Docker

1. Clone environment and open the project on command line.
2. Build Docker image by running `docker build --tag pdex .`
3. Run Docker image with and the api is ready to be used `docker run --publish 5000:5000 pdex`

### With Command Line

1. Clone environment and open the project on command line.
2. Run `npm install` (install node if necessary).
3. Run `npm start` and the api is ready to be used.

## Using the API

After setting up, using the API is very simple. Just use your favorite method of calling an API such as: your browser, `curl`, `httpie`, `postman`, etc. and access the url `http://localhost:5000/{pokemon}` where you can put your favorite pokemon in the place of `{pokemon}`.

## Testing

You can test the API by running `npm test` on the command line.

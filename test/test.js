const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index.js')
const should = chai.should()
chai.use(chaiHttp)

//test data
const raltsDesc = 'RALTS senses the emotions of people using the horns on its head. This POKéMON rarely appears before people. But when it does, it draws closer if it senses that the person has a positive disposition.'
const translatedRalts = "Ralts senses the emotions of people using the horns on its headeth. This pokémon rarely appears ere people. But at which hour 't doest,  't draws closer if 't be true 't senses yond the person hath a positive disposition."

describe('Get Pokemon', function () {

  it('should return an object with the pokemon name and translated description', function(done) {
    chai.request(server)
      .get('/ralts')
      .end((err, result) => {
        if (result.status == 429){
          console.log('Shakespeare API quota reached')
          this.skip()
        } else {
          result.should.have.status(200)
          result.body.should.be.a('object')
          result.body.should.have.property('name').eql('ralts');
          result.body.should.have.property('description').eql(translatedRalts);
        }
        done()
      })
  })

  it('should not be case sensitive', function(done) {
    chai.request(server)
      .get('/rALtS')
      .end((err, result) => {
        if (result.status == 429){
          console.log('Shakespeare API quota reached')
          this.skip()
        } else {
          result.should.have.status(200)
          result.body.should.be.a('object')
          result.body.should.have.property('name').eql('ralts');
          result.body.should.have.property('description').eql(translatedRalts);
        }
        done()
      })
  })

  it('should be able to find pokemon using their pokedex number', function(done) {
    chai.request(server)
      .get('/280')
      .end((err, result) => {
        if (result.status == 429){
          console.log('Shakespeare API quota reached')
          this.skip()
        } else {
          result.should.have.status(200)
          result.body.should.be.a('object')
          result.body.should.have.property('name').eql('ralts');
          result.body.should.have.property('description').eql(translatedRalts);
        }
        done()
      })
  })

  it('should return an error when an invalid name is used', function(done) {
    chai.request(server)
      .get('/joey')
      .end((err, result) => {
        result.should.have.status(404)
        done()
      })
  })

})
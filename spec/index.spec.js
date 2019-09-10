const chai = require('chai')
const chaiHttp = require('chai-http')
var expect = chai.expect

chai.use(chaiHttp)
const server = require('../index')

describe('search store by closest zip', () => {
    it('has the endpoint defined', (done) => {
        chai.request(server)
        .get('/closest')
        .query({zip: '55428'})
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
        })
    })

    it('has closest store returned', (done) => {
        chai.request(server)
        .get('/closest')
        .query({zip: '55428'})
        .end((err, res) => {
            expect(res.body).to.be.json
            done()
        })
    })
})
const chai = require('chai')
const chaiHttp = require('chai-http')
var expect = chai.expect

chai.use(chaiHttp)
const server = require('../index')

describe('get closest zip', () => {
    it('has the endpoint defined', (done) => {
        chai.request(server)
        .get('/closest')
        .query({zip: jasmine.any})
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
        })
    })
})
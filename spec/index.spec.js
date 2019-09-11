const chai = require('chai')
const chaiHttp = require('chai-http')
var chaiExpect = chai.expect

chai.use(chaiHttp)
const server = require('../index')
// const geodistance = require('../util/geodistance')
let geodistance = require('../util/geodistance')
const mockLatLon = {
    "lat": "80",
    "lon": "90",
}

describe('search store by closest zip', () => {

    beforeEach(() => {
        spyOn(geodistance, 'getLatLonFromZip').and.callFake((zip) => {
            return Promise.resolve(mockLatLon)
        })
    })

    it('has the endpoint defined', (done) => {
        chai.request(server)
        .get('/closest')
        .query({zip: '55428'})
        .end((err, res) => {
            chaiExpect(res).to.have.status(200)
            done()
        })
    })

    it('has closest store returned', (done) => {
        chai.request(server)
        .get('/closest')
        .query({zip: '55428'})
        .end((err, res) => {
            expect(res.body).toEqual(jasmine.any(Object))
            done()
        })
    })

    it('errors if zip not set as param', (done) => {
        chai.request(server)
        .get('/closest')
        .end((err, res) => {
            chaiExpect(res).to.have.status(400)
            expect(res.body).toEqual({message: 'missing or incorrect param zip=undefined or address=undefined'})
            done()
        })        
    })
})

describe('search store by closest address', () => {
    it('has the endpoint defined', (done) => {
        chai.request(server)
        .get('/closest')
        .query({address: 'Miller Trunk Hwy'})
        .end((err, res) => {
            chaiExpect(res).to.have.status(200)
            done()
        })
    })

    it('has closest store returned', (done) => {
        chai.request(server)
        .get('/closest')
        .query({address: 'Miller Trunk Hwy'})
        .end((err, res) => {
            expect(res.body).toEqual(jasmine.any(Object))
            done()
        })
    })

    it('errors if address not set as param', (done) => {
        chai.request(server)
        .get('/closest')
        .end((err, res) => {
            chaiExpect(res).to.have.status(400)
            expect(res.body).toEqual({message: 'missing or incorrect param zip=undefined or address=undefined'})
            done()
        })        
    })
})
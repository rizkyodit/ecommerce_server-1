const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

beforeAll((done) => {
  const seed = {
    email: 'admin@mail.com',
    password: '$2a$10$8WEFwLue7YkdRQMq1SbnzuvQbPgzOb0sAKetHQXAeSNRFnr8yEXFa',
    role: 'admin'
  }
  User.create(seed)
    .then(res => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

afterAll((done) => {
  User.destroy({ where: { email: 'admin@mail.com' } })
    .then(res => {
      done()
    })
    .catch(err => {
      done(err)
    })
})

describe('Test Endpoint POST /login', () => {

  test('test login success', (done) => {

    request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: '1234' })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('token', expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('test login error password empty', (done) => {

    request(app)
      .post('/login')
      .send({ email: 'admin@mail.com', password: '' })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Wrong Email/Password'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('test login error input empty', (done) => {

    request(app)
      .post('/login')
      .send({ email: '', password: '' })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(404)
        expect(body).toEqual(['Wrong Email/Password'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('test login error input null', (done) => {

    request(app)
      .post('/login')
      .send({ email: null, password: null })
      .then(res => {
        const { body, status } = res
        expect(status).toBe(404)
        expect(body).toEqual(['Wrong Email/Password'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
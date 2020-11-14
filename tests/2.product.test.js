const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

let token 
let id

beforeAll((done) => {
  const seed = {
    email: 'admin@mail.com',
    password: '$2a$10$8WEFwLue7YkdRQMq1SbnzuvQbPgzOb0sAKetHQXAeSNRFnr8yEXFa',
    role: 'admin'
  }
  User.create(seed)
    .then(res => {
      return request(app).post('/login').send({
        email: 'admin@mail.com',
        password: '1234'
      })
    })
    .then(res => {
      token = res.body.token
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

describe('Test Adding Product Using Endpoint POST /ecommerce', () => {

  test('Test Adding Success', (done) => {

    request(app)
      .post('/ecommerce')
      .send({ name: 'test', image_url: 'https://test.test/test', price: 123, stock: 1 })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        id = body.id
        expect(status).toBe(201)
        expect(body.name).toEqual('test')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Adding Error, Input Empty', (done) => {

    request(app)
      .post('/ecommerce')
      .send({ name: '', image_url: '', price: '', stock: '' })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Name Can't Be Empty!`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Adding Error, Price And Stock Value Below 0', (done) => {

    request(app)
      .post('/ecommerce')
      .send({ name: 'error', image_url: 'https://error.com/error', price: -1, stock: -1 })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Can't Put Price Lower Than 1`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Adding Error, Input Null', (done) => {

    request(app)
      .post('/ecommerce')
      .send({ name: null, image_url: null, price: null, stock: null })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Product.name cannot be null`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Adding Error, Token Invalid', (done) => {

    request(app)
      .post('/ecommerce')
      .send({ name: 'test', image_url: 'https://test.test/test', price: 123, stock: 1 })
      .set('token', 'token')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Authentication Failed'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Test Updating Product Using Endpoint PUT /ecommerce', () => {

  test('Test Updating Successfull', (done) => {

    request(app)
      .put('/ecommerce/' + id)
      .send({ name: 'edit', image_url: 'https://edit.com/edit', price: 321, stock: 2 })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body.name).toBe('edit')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Updating Error, Input Empty', (done) => {

    request(app)
      .put('/ecommerce/' + id)
      .send({ name: '', image_url: '', price: '', stock: '' })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Name Can't Be Empty!`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Updating Error, Price and Stock Value Below 0', (done) => {

    request(app)
      .put('/ecommerce/' + id)
      .send({ name: 'error', image_url: 'https://error.com/error', price: -1, stock: -1 })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Can't Put Price Lower Than 1`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Updating Error, Input Null', (done) => {

    request(app)
      .put('/ecommerce/' + id)
      .send({ name: null, image_url: null, price: null, stock: null })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(400)
        expect(body[0]).toEqual(`Product.name cannot be null`)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Updating Error, Token Invalid', (done) => {

    request(app)
      .put('/ecommerce/' + id)
      .send({ name: 'edit', image_url: 'https://edit.com/edit', price: 321, stock: 2 })
      .set('token', 'token')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Authentication Failed'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Updating Error, Id Not Found', (done) => {

    request(app)
      .put('/ecommerce/' + -1)
      .send({ name: 'edit', image_url: 'https://edit.com/edit', price: 321, stock: 2 })
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(404)
        expect(body).toEqual(['Product Not Found'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Test Fetching All Product Using Endpoint GET /ecommerce', () => {

  test('Test Fetching Success', (done) => {

    request(app)
      .get('/ecommerce')
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Fetching Error, Token Invalid', (done) => {

    request(app)
      .get('/ecommerce')
      .set('token', 'token')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Authentication Failed'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Test Fetching One Product Using Endpoint GET /ecommerce:id', () => {

  test('Test Fetch One Success', (done) => {

    request(app)
      .get('/ecommerce/' + id)
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toEqual(expect.any(Object))
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Fetch One Error, Invalid Id', (done) => {

    request(app)
      .get('/ecommerce/' + -1)
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(404)
        expect(body).toEqual(['Product Not Found'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Fetch One Error, Invalid Token', (done) => {
    
    request(app)
      .get('/ecommerce/' + id)
      .set('token', 'token')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Authentication Failed'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Test Deleting Product Using Endpoint DELETE /ecommerce', () => {

  test('Test Deleting Error, Id Invalid', (done) => {

    request(app)
      .delete('/ecommerce/' + -1)
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(404)
        expect(body).toEqual(['Product Not Found'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Deleting Error, Token Invalid', (done) => {

    request(app)
      .delete('/ecommerce/' + id)
      .set('token', 'token')
      .then(res => {
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toEqual(['Authentication Failed'])
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Test Deleting Success', (done) => {

    request(app)
      .delete('/ecommerce/' + id)
      .set('token', token)
      .then(res => {
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toBe('Product Deleted Successfully')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
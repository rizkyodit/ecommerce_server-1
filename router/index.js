const route = require('express').Router()
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.get('/', (req, res) => {
  res.send('Hello World!')
})
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use(authentication)
route.get('/ecommerce', ProductController.showAll)
route.get('/ecommerce/:id', ProductController.showOne)
route.use(authorization)
route.post('/ecommerce', ProductController.add)
route.put('/ecommerce/:id', ProductController.edit)
route.delete('/ecommerce/:id', ProductController.deleted)

module.exports = route
const router = require("express").Router()
const UserController =require('../controllers/UserController')


//login

router.post("/login", UserController.login);

module.exports = router;
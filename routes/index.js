const router = require("express").Router()
const UserController =require('../controllers/UserController')
const ProductController = require("../controllers/ProductController");
const { authentication, authorization } = require("../middlewares/auth");



//login

router.post("/login", UserController.login);

//GET PRODUCTS
router.get("/products", authentication, authorization, ProductController.show);

//ADD PRODUCTS
router.post("/products", authentication, authorization, ProductController.add);

//EDIT PRODUCTS
router.get("/products/:id", authentication, authorization, ProductController.find);
router.put("/products/:id", authentication, authorization, ProductController.edit);

//DELETE PRODUCTS
router.delete("/products/:id", authentication, authorization, ProductController.delete);


module.exports = router;
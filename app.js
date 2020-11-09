const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const routes = require("./routes");
const errHandler = require("./middlewares/errHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);
app.use(errHandler);

// app.listen(port, () =>{
//   console.log('app listen on ' + port )
// })


module.exports = app
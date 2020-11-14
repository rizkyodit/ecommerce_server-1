# e-commerce-cms
Membuat Content Management System untuk e-commerce
E-Commerce-CMS with name Carrepmu . This app has:

&nbsp;

## Endpoints
````
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id
````

### RESTful endpoints

### POST /login

> Login to Carrepmu

_Request Header_
```
not needed
```

_Request Body_
```json
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYwNTM0Mzc4OH0.DaSz2YPk98cO4IgSycgtTu53QaHB5dF4gs9ZtnKFoLo"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

### GET /products

> Show all Carrepmu products

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
   "id": "<id_of_the_product>",
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-11-14T08:49:31.615Z",
    "updatedAt": "2020-11-14T08:49:31.615Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (500 - Internal server error)_
```json
{
  "message": "Internal Server Error"
}
```

### POST /products

> Create new products

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": "<given id by system>",
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "Please fill the field!, Do not input value under 1!"
}
```

### GET /products/:id

> Find detail product by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
   "id": 1,
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-11-14T08:49:31.615Z",
    "updatedAt": "2020-11-14T08:49:31.615Z"
}
```

_Response (401 - Not Authenticated)_
```json
{
  "message": "Doesnt recognize user.."
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

### PUT /products/:id

> Update product by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (200)_
```json
{
  "id": "<selected id>",
  "name": "<updated name>",
  "image_url": "<updated image_url>",
  "price": "<updated price>",
  "stock": "<updated stock>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad request)_
```json
{
  "message": "field cannot blank!, gaboleh minus dong!"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /products/:id

> Delete product data by ID

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
   "id": 1,
    "name": "<product_name>",
    "image_url": "<product_image_url>",
    "price": "<product_price>",
    "stock": "<product_stock>",
    "createdAt": "2020-11-14T08:49:31.615Z",
    "updatedAt": "2020-11-14T08:49:31.615Z"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
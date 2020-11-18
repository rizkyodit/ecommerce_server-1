# ECOMMERCE CMS APP #

1. **REGISTER USER**

    * **URL**

      `/register`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `email = [string]`
      - `password = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "id": 29,
          "role": "customer",
          "email": "asd@asd.asd"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Wrong Email/Password"
        ]
        ```
      
      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
         "Internal Server Error"
        ]
        ```

2. **LOGIN USER**

    * **URL**

      `/login`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `email = [string]`
      - `password = [string]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTcyNjIxM30.XaZ8uMGb4sOhdtyyF1Rme5ziuZeO1oTvbJrEu43NXhY",
          "id": 1
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Wrong Email/Password"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Wrong Email/Password"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
         "Internal Server Error"
        ]
        ```

3. **ADD PRODUCT**

    * **URL**

      `/ecommerce`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `name = [string]`
      - `image_url = [string]`
      - `price = [integer]`
      - `stock = [integer]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "id": 6,
          "name": "asd",
          "image_url": "https://test.com/test",
          "price": 5000,
          "stock": 2,
          "updatedAt": "2020-11-06T10:21:14.858Z",
          "createdAt": "2020-11-06T10:21:14.858Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Title Can't Be Empty!",
          "Description Can't Be Empty!",
          "Category Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

4. **LIST PRODUCT**

    * **URL**

      `/ecommerce`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        [
          {
            "id": 6,
            "name": "asd",
            "image_url": "https://test.com/test",
            "price": 5000,
            "stock": 2,
            "updatedAt": "2020-11-06T10:21:14.858Z",
            "createdAt": "2020-11-06T10:21:14.858Z"
          },
          {
            "id": 7,
            "name": "test",
            "image_url": "https://test.com/test",
            "price": 5000,
            "stock": 2,
            "updatedAt": "2020-11-06T10:21:14.858Z",
            "createdAt": "2020-11-06T10:21:14.858Z"
          }
        ]
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

5. **ONE PRODUCT**

    * **URL**

      `/ecommerce/:id`

    * **Method:**

      `GET`
    
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        {
          "id": 6,
          "name": "asd",
          "image_url": "https://test.com/test",
          "price": 5000,
          "stock": 2,
          "updatedAt": "2020-11-06T10:21:14.858Z",
          "createdAt": "2020-11-06T10:21:14.858Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Product Not Found"
        ]
        ```
      
      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

6. **UPDATE PRODUCT**

    * **URL**

      `/ecommerce/:id`

    * **Method:**

      `PUT`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Data Params**

        **Required:**

        - `name = [string]`
        - `image_url = [string]`
        - `price = [integer]`
        - `stock = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        {
          "id": 6,
          "name": "edit",
          "image_url": "https://edit.com/edit",
          "price": 1000,
          "stock": 5,
          "createdAt": "2020-11-06T05:00:23.510Z",
          "updatedAt": "2020-11-06T10:32:00.972Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Title Can't Be Empty!",
          "Description Can't Be Empty!",
          "Category Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Product Not Found"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error" 
        ]
        ```

7. **DELETE PRODUCT**

    * **URL**

      `/ecommerce/:id`

    * **Method:**

      `DELETE`
      
    *  **URL Params** 

        **Required:**

        - `id = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        "Product Deleted Successfully"
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Product Not Found"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

8. **ADD CART**

    * **URL**

      `/ecomm-client`

    * **Method:**

      `POST`

    * **Data Params**

      **Required:**

      - `ProductId = [integer]`
      - `amount = [integer]`

    * **Success Response:**

      * **Code:** `201 CREATED` <br />
        **Content:** 
        ```json 
        {
          "id": 48,
          "UserId": 1,
          "ProductId": 6,
          "amount": 1,
          "updatedAt": "2020-11-18T18:34:56.858Z",
          "createdAt": "2020-11-18T18:34:56.858Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Amount Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

9. **LIST PRODUCT (FOR CLIENT)**

    * **URL**

      `/ecomm-client/product`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        [
          {
            "id": 6,
            "name": "asd",
            "image_url": "https://test.com/test",
            "price": 5000,
            "stock": 2,
            "updatedAt": "2020-11-06T10:21:14.858Z",
            "createdAt": "2020-11-06T10:21:14.858Z"
          },
          {
            "id": 7,
            "name": "test",
            "image_url": "https://test.com/test",
            "price": 5000,
            "stock": 2,
            "updatedAt": "2020-11-06T10:21:14.858Z",
            "createdAt": "2020-11-06T10:21:14.858Z"
          }
        ]
        ```
    
    * **Error Response:**

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

10. **LIST CART**

    * **URL**

      `/ecomm-client`

    * **Method:**

      `GET`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        [
          {
            "id": 23,
            "UserId": 1,
            "ProductId": 4,
            "amount": 5,
            "createdAt": "2020-11-18T16:15:42.649Z",
            "updatedAt": "2020-11-18T16:16:45.115Z",
            "Product": {
                "id": 4,
                "name": "cek 1",
                "image_url": "https://cdn.shopify.com/s/files/1/0016/5111/4048/products/bajukokopersebayalongsleeve_1024x1024@2x.jpg?v=1588025352",
                "price": 50000,
                "stock": 12,
                "createdAt": "2020-11-13T16:25:42.391Z",
                "updatedAt": "2020-11-14T08:17:18.509Z"
            }
          },
          {
            "id": 46,
            "UserId": 1,
            "ProductId": 4,
            "amount": 1,
            "createdAt": "2020-11-18T18:33:20.567Z",
            "updatedAt": "2020-11-18T18:33:20.567Z",
            "Product": {
                "id": 4,
                "name": "cek 1",
                "image_url": "https://cdn.shopify.com/s/files/1/0016/5111/4048/products/bajukokopersebayalongsleeve_1024x1024@2x.jpg?v=1588025352",
                "price": 50000,
                "stock": 12,
                "createdAt": "2020-11-13T16:25:42.391Z",
                "updatedAt": "2020-11-14T08:17:18.509Z"
            }
          }
        ]
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```
      
      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```

11. **UPDATE CART**

    * **URL**

      `/ecomm-client`

    * **Method:**

      `PATCH`
      
    * **Data Params**

        **Required:**

        - `ProductId = [integer]`
        - `amount = [integer]`

    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        {
          "id": 36,
          "UserId": 1,
          "ProductId": 6,
          "amount": 5,
          "createdAt": "2020-11-18T18:30:21.036Z",
          "updatedAt": "2020-11-18T18:52:05.426Z"
        }
        ```
    
    * **Error Response:**

      * **Code:** `400 BAD REQUEST` <br />
        **Content:** 
        ```json
        [
          "Amount Can't Be Empty!"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error" 
        ]
        ```

12. **DELETE CART**

    * **URL**

      `/ecomm-client`

    * **Method:**

      `DELETE`
      
    * **Success Response:**

      * **Code:** `200 OK` <br />
        **Content:** 
        ```json 
        "Cart Deleted Successfully"
        ```
    
    * **Error Response:**

      * **Code:** `401 UNAUTHORIZED` <br />
        **Content:** 
        ```json
        [
          "Authentication Failed"
        ]
        ```

      OR

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "Cart Not Found"
        ]
        ```

      OR

      * **Code:** `500 INTERNAL SERVER ERROR` <br />
        **Content:** 
        ```json
        [
          "Internal Server Error"
        ]
        ```
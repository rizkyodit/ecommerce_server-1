# ECOMMERCE CMS APP #

1. **LOGIN USER**

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
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MDUwMDI4MjF9.xsY6G0ZRKIRC8IBQtNy7vPnJ-pz4fqFHEDVjHyIFOcs",
          "email": "admin@mail.com"
        }
        ```
    
    * **Error Response:**

      * **Code:** `404 NOT FOUND` <br />
        **Content:** 
        ```json
        [
          "wrong email/password"
        ]
        ```

      OR

      * **Code:** `401 UNAUTHOTIZED` <br />
        **Content:** 
        ```json
        [
          "wrong email/password"
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


2. **ADD PRODUCT**

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
          "Not Authorized"
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

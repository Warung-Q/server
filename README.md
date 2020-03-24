# Owner Routes

## **Register Owner**

Owner Register create new owner to database

- **URL**

  /owner/register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "username": "bau fakhran",
    "email": "bau@mail.com",
    "password": "bau123",
    "warung_name": "berkah 77"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "username": "andi",
      "email": "andi@mail.com",
      "password": "andi123",
      "warung_name": "berkah 77"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{

    ```json
    {
      "msg": "Bad Request",
      "errors": ["warung name cannot be empty"]
    }
    ```

## **Login Owner**

Owner Login find Owner by email and password

- **URL**

  /owner/owner

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "email": "bau@mail.com",
    "password": "bau123"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "warung_name": "warung berkah",
      "username": "bau fakhran",
      "email": "bau@mail.com",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMCwiZW1haWwiOiJiYXVAbWFpbC5jb20iLCJXYXJ1bmdJZCI6OH0sImlhdCI6MTU4NTAwNzAxNX0.N-GMWHKuNaUlBtEADrjDIPHkIV_Vyx6fSd-zfnzr3L0"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{

    ```json
    {
      "msg": "login failed",
      "errors": "invalid email or password"
    }
    ```

## **Google Login Owner**

Owner login with google

- **URL**

  /owner/google_signin

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**
  ```json
  {
    "email": "bau@mail.com",
    "password": "bau123"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "warung_name": "warung berkah",
      "username": "bau fakhran",
      "email": "bau@mail.com",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMCwiZW1haWwiOiJiYXVAbWFpbC5jb20iLCJXYXJ1bmdJZCI6OH0sImlhdCI6MTU4NTAwNzAxNX0.N-GMWHKuNaUlBtEADrjDIPHkIV_Vyx6fSd-zfnzr3L0"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{

    ```json
    {
      "msg": "login failed",
      "errors": "invalid email or password"
    }
    ```

# Warung Routes

## **Add Warung**

Create new warung to database

- **URL**

  /warung

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  ```json
  {
    "name": "bau fakhran",
    "ManagerId": 1,
    "OwnerId": 1
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{

    ```json
    {
      "id": 8,
      "name": "warung bau fakhran",
      "OwnerId": 10,
      "ManagerId": null,
      "createdAt": "2020-03-22T08:26:35.240Z",
      "updatedAt": "2020-03-22T08:26:35.240Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{

    ```json
    {
      "msg": "Bad Request",
      "errors": ["warung name cannot be empty"]
    }
    ```

## **FIND All Warung**

Returns json data about warung

- **URL**

  /warung

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    [
      {
        "id": 8,
        "name": "warung bau fakhran",
        "OwnerId": 10,
        "ManagerId": null,
        "createdAt": "2020-03-22T08:26:35.240Z",
        "updatedAt": "2020-03-22T08:26:35.240Z",
        "Products": [
          {
            "id": 28,
            "name": "sunlight merah",
            "price": 5000,
            "stock": 55,
            "barcode": "123891312",
            "WarungId": 8,
            "CategoryId": 3,
            "expired_date": "2020-03-29T00:00:00.000Z",
            "createdAt": "2020-03-22T08:27:40.811Z",
            "updatedAt": "2020-03-23T05:03:22.819Z"
          }
        ]
      }
    ]
    ```

## **FIND One Warung**

Returns json of one Warung

- **URL**

  `/warung/:id`

- **Method:**

  `GET`

- **URL Params**

  `id`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "id": 8,
      "name": "warung bau fakhran",
      "OwnerId": 10,
      "ManagerId": null,
      "createdAt": "2020-03-22T08:26:35.240Z",
      "updatedAt": "2020-03-22T08:26:35.240Z",
      "Products": [
        {
          "id": 28,
          "name": "sunlight merah",
          "price": 5000,
          "stock": 55,
          "barcode": "123891312",
          "WarungId": 8,
          "CategoryId": 3,
          "expired_date": "2020-03-29T00:00:00.000Z",
          "createdAt": "2020-03-22T08:27:40.811Z",
          "updatedAt": "2020-03-23T05:03:22.819Z"
        }
      ]
    }
    ```

## **Update Warung**

Update Warung data by id

- **URL**

  `/warung/:id`

- **Method:**

  `PUT`

- **URL Params**

  `id`

- **Data Params**

  ```json
  {
    "name": "warung berkah",
    "OwnerId": 10,
    "ManagerId": 1
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "msg": "Warung updated successfully"
    }
    ```

## **Delete Warung**

Delete warung data by id

- **URL**

  `/warung/:id`

- **Method:**

  `DELETE`

- **URL Params**

  `id`

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "msg": "Warung deleted successfully"
    }
    ```

# Products routes

## **FIND All Products**

Returns json data about products

- **URL**

  /products

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "products": [
        {
          "id": 28,
          "name": "sunlight merah",
          "price": 5000,
          "stock": 55,
          "barcode": "123891312",
          "expired_date": "2020-03-29T00:00:00.000Z",
          "category": "perlengkapan rumah tangga",
          "CategoryId": 3,
          "createdAt": "2020-03-22T08:27:40.811Z",
          "updatedAt": "2020-03-23T05:03:22.819Z"
        }
      ]
    }
    ```

## **Add new Product**

Create new product to database

- **URL**

  /products

- **Method:**

  `POST`

- **URL Params**

  none

- **Data Params**

  ```json
  {
    "name": "sunlight jeruk nipis",
    "price": 5000,
    "stock": 15,
    "expired_date": "2020-04-15",
    "barcode": "123891312",
    "CategoryId": 3
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "product": {
        "id": 1,
        "name": "sunlight jeruk nipis",
        "stock": 15,
        "price": 5000,
        "barcode": "123891312",
        "CategoryId": 3,
        "expired_date": "2020-04-15T00:00:00.000Z",
        "WarungId": 1,
        "updatedAt": "2020-03-23T03:31:07.967Z",
        "createdAt": "2020-03-23T03:31:07.967Z"
      },
      "msg": "success insert new product"
    }
    ```

## **FIND One Product**

Returns json data of one product

- **URL**

  /products/:id

- **Method:**

  `GET`

- **URL Params**

  `id`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "id": 29,
      "name": "sunlight merah",
      "price": 5000,
      "stock": 40,
      "barcode": "123891312",
      "WarungId": 8,
      "CategoryId": 3,
      "expired_date": "2020-03-29T00:00:00.000Z",
      "createdAt": "2020-03-22T13:11:34.351Z",
      "updatedAt": "2020-03-23T06:03:53.961Z",
      "Category": {
        "id": 3,
        "name": "perlengkapan rumah tangga",
        "createdAt": "2020-03-22T02:25:54.666Z",
        "updatedAt": "2020-03-22T02:25:54.666Z"
      }
    }
    ```

## **Update Product**

Update product data by id

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **URL Params**

  `id`

- **Data Params**

  ```json
  {
    "name": "sunlight jeruk nipis",
    "price": 5000,
    "stock": 15,
    "expired_date": "2020-04-15",
    "barcode": "123891312",
    "CategoryId": 3
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "status": [1],
      "msg": "success update product"
    }
    ```

## **Update STOCK Product**

Update product stock by id

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **URL Params**

  `id`

- **Data Params**

  ```json
  {
    "stock": 15
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "status": [1],
      "msg": "success update product"
    }
    ```

## **Delete Product**

Delete product by id

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **URL Params**

  `id`

- **Data Params**

  none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{

    ```json
    {
      "status": 1,
      "msg": "success delete product"
    }
    ```

# Transaction Routes

## **add transaction**

Create new transaction to database

- **URL**

  /transaction

- **Method:**

  `POST`

- **URL Params**

  node

- **Data Params**

  ```json
  {
    "carts": [
      {
        "ProductId": 30,
        "quantity": 1,
        "total_price": 10000
      },
      {
        "ProductId": 29,
        "quantity": 1,
        "total_price": 10000
      }
    ],
    "email": "baufakhran@students.itb.ac.id"
  }
  ```

* **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{

    ```json
    {
      "result": [
        {
          "id": 54,
          "ProductId": 30,
          "quantity": 1,
          "total_price": 10000,
          "name": "sunlight merah",
          "WarungId": 8,
          "updatedAt": "2020-03-23T06:03:53.983Z",
          "createdAt": "2020-03-23T06:03:53.983Z"
        },
        {
          "id": 55,
          "ProductId": 29,
          "quantity": 1,
          "total_price": 10000,
          "name": "sunlight merah",
          "WarungId": 8,
          "updatedAt": "2020-03-23T06:03:53.984Z",
          "createdAt": "2020-03-23T06:03:53.984Z"
        }
      ],
      "total": 20000
    }
    ```

# NEWS Routes

## **find All News**

Returns json data about transactions

- **URL**

  /news

- **Method:**

  `GET`

- **URL Params**

  none

- **Data Params**

  none

- **Success Response:**

* **Code:** 200 <br />
  **Content:** `{

  ```json
  [
    {
      "id": 8,
      "message": "product expiring within less than 2 weeks:",
      "WarungId": 8,
      "createdAt": "2020-03-24T08:32:00.069Z",
      "updatedAt": "2020-03-24T08:32:00.069Z"
    }
  ]
  ```

## **delete news**

Returns json data about products

- **URL**

/news/:id

- **Method:**

`DELETE`

- **URL Params**

none

- **Data Params**

none

- **Success Response:**

* **Code:** 200 <br />
  **Content:**

  ```json
  1
  ```

# CATEGORY Routes

## **find All News**

Returns json data about products

- **URL**

  /news

- **Method:**

  `GET`

- **URL Params**

  none

- **Data Params**

  none

- **Success Response:**

* **Code:** 200 <br />
  **Content:** `{

  ```json
  [
    {
        "id": 1,
        "name": "makanan",
        "createdAt": "2020-03-23T02:21:34.492Z",
        "updatedAt": "2020-03-23T02:21:34.492Z"
    },
    {
        "id": 2,
        "name": "minuman",
        "createdAt": "2020-03-23T02:21:34.492Z",
        "updatedAt": "2020-03-23T02:21:34.492Z"
    },
    {
        "id": 3,
        "name": "perlengkapan rumah tangga",
        "createdAt": "2020-03-23T02:21:34.492Z",
        "updatedAt": "2020-03-23T02:21:34.492Z"
    },
    {
        "id": 4,
        "name": "alat kantor",
        "createdAt": "2020-03-23T08:02:49.367Z",
        "updatedAt": "2020-03-23T08:02:49.367Z"
    }
  ]
  ```

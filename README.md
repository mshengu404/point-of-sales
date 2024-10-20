# Point of Sale API - Backend Developer Exercise

## Overview

This project is a simple Point of Sale (POS) API built using **TypeScript** on a **Node.js** environment. It includes features like user authentication, product management, upsell product management, and sales/transactions management. The project demonstrates key practices such as scalability, security, and forethought for future enhancements.

## Features

1. **User Authentication**  
   - User sign-up with email and password.
   - Passwords are securely hashed and stored in the database.
   - Token-based authentication for securing API endpoints.
  
2. **Product Management**  
   - Create, retrieve, update, and delete products with attributes such as name, price, description, and quantity.

3. **Upsell Product Management**  
   - Link a product to another as an upsell.
   - Retrieve upsell products.
   - Remove upsell links.

4. **Sales and Transactions Management**  
   - Create a new sale with details of products sold and their upsell products.
   - Retrieve details of specific transactions.

## Technologies Used

- **Node.js 20+**
- **TypeScript**
- **Fastify** (Web framework)
- **Sequelize** (ORM for database management)
- **MySQL** (Relational database)
- **JWT** (Token-based authentication)
- **ESLint** with **StandardJS** (Code linting)
- **Jest** (Unit testing)

## Prerequisites

- **Node.js 20+**
- **MySQL** (or any other allowed relational database)
- **Docker** (Optional, for containerized setup)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-repo/point-of-sale-api.git
    cd point-of-sale-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Setup your `.env` file with the following details:

    ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=password
    DB_NAME=pos
    JWT_SECRET=your_jwt_secret
    ```

4. Initialize the database:

    If you are using Docker, run:

    ```bash
    docker-compose up -d
    ```

    Otherwise, make sure you have MySQL running and create a database named `pos`.

    Then, run migrations:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

    The API will be running at `http://localhost:3000`.

## API Documentation

A Postman collection is provided in the `postman_collection.json` file to help you test the API endpoints.

### Authentication

- **POST /auth/signup** - Register a new user
- **POST /auth/login** - Login a user and retrieve a token

### Product Management

- **POST /products** - Create a new product
- **GET /products** - Retrieve all products
- **PUT /products/:id** - Update an existing product
- **DELETE /products/:id** - Delete a product

### Upsell Product Management

- **POST /products/:id/upsell** - Link a product to an upsell
- **GET /products/:id/upsell** - Retrieve upsell products linked to a specific product
- **DELETE /products/:id/upsell/:upsellId** - Remove an upsell link

### Sales and Transactions

- **POST /transactions** - Create a new sale transaction
- **GET /transactions/:id** - Retrieve details of a specific transaction

## Testing

To run unit tests:

```bash
npm run test

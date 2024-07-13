# Bank CRUD system

This project demonstrates the implementation of a Bank CRUD system (managing accounts and transactions) using Node.js, TypeScript, Koa.js, GraphQL, Relay and MongoDB. 

The focus is on creating an HTTP server that can perform transactions between accounts and calculating account balances.


## Features

- Node.js HTTP server using Koa.js
- GraphQL mutation for querying a simulated transactions
- Integration testing with Jest 
- Postman collection for API testing
- Docker image available and docker-compose do deploy the project


## Getting Started - Docker-compose

To get started using Docker with this project, follow these steps:

### Prerequisites

- Docker and Docker-compose

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/rafaelparma/crud-bank-graphql-relay.git
    $ cd crud-bank-graphql-relay
    ```

2. Run docker-compose command:

    ```bash
    $ docker-compose up -d
    ```

Wait until the Docker containers initialize, and the application will be available for use.



## Getting Started - NodeJS

To get started using NodeJS with this project, follow these steps:

### Prerequisites

- Node.js (>=14.0.0)
- MongoDB (local or remote instance)
- Yarn or npm

### Installation

1. Clone the repository:

    ```bash
    $ git clone https://github.com/rafaelparma/crud-bank-graphql-relay.git
    $ cd crud-bank-graphql-relay
    ```

2. Install dependencies:

    ```bash
    $ yarn install
    # or
    $ npm install
    ```
3. Set up your MongoDB instance and update the database connection string in .env file.

4. Create a .env file in the root directory with the following variables:
    ```bash
    APP_PORT=4000
    JWT_SECRET=your_jwt_secret
    MONGO_URI=mongodb://localhost:27017/crud-bank-graphql-relay    
    ```
5. Run the server:
    ```bash
    $ yarn start
    # or
    $ npm start
    ```

## Testing
Testing is conducted using Jest to validate the Bank CRUD system.

Run tests with:
```bash
$ yarn test
# or
$ npm test
```

## Postman Collection


A Postman collection is included in the /crud-bank-graphql-relay/postman/ directory. 

Import it into Postman to test the API endpoints.


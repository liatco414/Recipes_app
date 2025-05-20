# Recipe App Backend

This is the backend server for a Recipe Blog app. The server is built with Node.js and uses MongoDB for data storage. Its purpose is to manage recipes, users, and categories within the system.

## System Requirements

Before you start working with the project, make sure you have the following requirements:

-   Node.js v18 or higher
-   MongoDB (Atlas or local)
-   Internet access for MongoDB Atlas (if using it)

## Installation

1. Download the files to your local machine.
2. Install all dependencies by running:
    ```bash
    npm install
    ```

## 3. Create a `.env` file in the root directory of your project and include the following environment variables:

Example `.env` file:

```env
SECRET='lishaimor'
CONNECTION_STRING_ATLAS=mongodb+srv://<username>:<password>@cluster.mongodb.net/Recipe_Server?retryWrites=true&w=majority
```

## Database Connection

The server supports two types of database connections, which can be selected based on the environment:

MongoDB Atlas – Cloud-based database (production environment).

Local MongoDB – Local database connection (development environment).

The connection type is determined by the ENVIRONMENT variable in the .env file. If you're working in the development environment, the server will connect to the local database. In the production environment, it will connect to MongoDB Atlas.

## Running the Server

Once you have installed the dependencies and set up your `.env` file, you can run the server using the following commands:

For the development environment (with automatic reloading during development):

```bash
npm run dev
```

For the production environment (optimized for performance):

```bash
npm start
```

The server will listen on port 3000 by default.

API Routes
(You can update this section with your routes)

## Main Routes:

GET /api/recipes – Fetch all recipes.

POST /api/recipes – Add a new recipe (for users with blogger permissions).

PUT /api/recipes/:id – Update a recipe (for users with blogger permissions).

DELETE /api/recipes/:id – Delete a recipe (for users with blogger permissions).

GET /api/categories – Fetch all categories.

POST /api/users/login - login user

POST /api/users - register user

## User Permissions:

Unregistered users can only view recipes and leave comments.

Registered users can add and comment on recipes.

Users with blogger permissions can add, update, and delete recipes.

## Dependencies

This project uses the following dependencies:

express – For API routing.

mongoose – To interact with MongoDB.

jsonwebtoken – For user authentication.

bcryptjs – For password hashing.

joi – For form validations.

morgan – For request logging.

config – For configuration management.

## Additional Notes

Each incoming request is logged by the loggerService module.

Make sure your database is running before starting the server.

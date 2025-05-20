# React Recipes App

A recipe management application that allows users to browse categories, view recipes, comment on them, and upload new recipes (for bloggers). Additionally, administrators have access to delete recipes and remove comments.

## Features

-   **Category Browsing**: You can view recipes by categories and enter any category to see the recipes that match it.
-   **Recipe Upload**: Bloggers can upload, edit, and delete recipes (CRUD).
-   **Comments**: Any user can comment on recipes, but only bloggers and administrators can delete comments.
-   **Save Recipes**: Users can save recipes to their favorites.
-   **User Profile**: Each registered user has a profile where they can see the recipes they've saved.
-   **Restricted Access for Unregistered Users**: Unregistered users can only view recipes but cannot save or comment on them.

## System Requirements

-   Node.js (version 16 or higher)
-   NPM or Yarn

## Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd frontend/recipes_app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set environment variables**:
   Create a `.env` file in the root directory with the following variable:

    ```
    VITE_API_URL=http://localhost:3000
    ```

4. **Run the app**:
   After installing the dependencies, run the local development server:

    ```bash
    npm run dev
    ```

    The app will open in the browser at [http://localhost:5173](http://localhost:5173).

## Folder Structure

The project is structured as follows:

src/
│
├── components/ # React components
├── pages/ # Different pages in the app
├── services/ # Functions for making API calls (axios)
│ ├── users.js
│ ├── recipes.js
│ └── categories.js
├── styles/ # CSS files

### API Services

The files in `services/` are responsible for API calls:

-   **users.js**: Functions for user management (login, registration).
-   **recipes.js**: Functions for recipe management (uploading, editing, deleting, saving).
-   **categories.js**: Functions for category management of recipes.

## Technologies

-   **React**: For building the application.
-   **React Router**: For navigation between pages.
-   **Axios**: For making HTTP requests to the server.
-   **JWT**: For managing user authentication.
-   **Bootstrap**: For fast UI design.
-   **Formik + Yup**: For form handling and validation.
-   **React Toastify**: For user notification alerts.

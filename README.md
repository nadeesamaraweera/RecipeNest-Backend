# RecipeNest Backend

This is the backend service for the RecipeNest application, built with TypeScript, Express, and Prisma.

## API Documentation

For detailed API documentation, please visit [API Documentation](https://documenter.getpostman.com/view/35386291/2sAYdhHVCB).

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nadeesamaraweera/RecipeNest-Backend.git
    cd RecipeRadar-Backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="mysql://user:password@localhost:3306/database"
    PORT=3000
    ```

4. Run database migrations:
    ```sh
    npx prisma migrate dev
    ```

5. Start the server:
    ```sh
    npm start
    ```

## Project Structure

- `src/`: Source code
- `prisma/`: Prisma schema and migrations
- `routes/`: Express routes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

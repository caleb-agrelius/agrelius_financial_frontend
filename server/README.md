Server example (Node.js + Express + Knex + PostgreSQL)

Quickstart (local development):

1. Install dependencies

   cd server
   npm install

2. Configure database

   - By default knexfile uses environment variables. Create a .env file in the server folder with:

     DATABASE_URL=postgres://user:password@localhost:5432/agrelius_blog

   or set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME as preferred.

3. Run migrations

   npm run migrate

4. Start server

   npm start

The server exposes the following endpoints (JSON):

GET /posts         -> list posts
GET /posts/:id     -> get single post
POST /posts        -> create post (body: { title, content })
PUT /posts/:id     -> update post (body: { title, content })
DELETE /posts/:id  -> delete post

Notes:
- This is a minimal example intended for local development. Add authentication, validation, and rate limiting for production.
- To deploy, use services like Render, Heroku, Fly, or a container image on any cloud provider. Ensure DATABASE_URL is set in your environment.

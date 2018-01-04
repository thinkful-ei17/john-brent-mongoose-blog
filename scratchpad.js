








- Wire - up database to the endpoints.IOW, replace ** dummy data ** with real database calls.
  // - [] Add`knex` and`pg` to the project
  - [] Update`config.js` with DB connection info
    - [] Import`knex` and database config into the router file
      - [] Update GET`/api/v1/stories` endpoint to use`knex.select()...`
        - [] Update GET`/api/v1/stories/:id` endpoint to use`knex.select()...`
          - [] Update POST`/api/v1/stories/` endpoint to use`knex.insert()...`
            - [] Update PUT`/api/v1/stories/:id` endpoint to use`knex.update()...`
              - [] Update DELETE`/api/v1/stories/:id` endpoint to use`knex.del()...`

                - Deploy to Heroku(see[Deploying to Heroku](https://courses.thinkful.com/node-001v5/project/1.3.5))
  -[] Install Heroku CLI app, if necessary
  - [] Create app on Heroku
    - [] Update git remote to point to Heroku
      - [] Push app to Heroku. (Note: app won't work yet)
        - [] Create a production database on Elephant SQL.Use`query.sql` from earlier to easily create the database
        - [] Configure Heroku config vars to use`DATABASE_URL` and the Elephant SQL connection string  




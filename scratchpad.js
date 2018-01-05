import { create } from "domain";


  //               - Deploy to Heroku(see[Deploying to Heroku](https://courses.thinkful.com/node-001v5/project/1.3.5))
  // -[] Install Heroku CLI app, if necessary
  // - [] Create app on Heroku
  //   - [] Update git remote to point to Heroku
  //     - [] Push app to Heroku. (Note: app won't work yet)
  //       - [] Create a production database on Elephant SQL.Use`query.sql` from earlier to easily create the database
  //       - [] Configure Heroku config vars to use`DATABASE_URL` and the Elephant SQL connection string


        ## Add Authors
Congrats! The boss is very impressed with your work and the quick turn - around.She is so impressed in fact that she is wondering if you could add`authors` to the stories.You think about for a bit and decide it should be relatively easy to just update the api.But there is a wrinkle, that sales team is already using the first version and the changes might break their app.After pondering your options for a bit you remember you are using express router so you decide to create a ** /v2** route. 

You create the following high - level tasks:

// ### Tasks:
// - Update the Database:
// -[] Create an`authors` table
//   - 3 Columns
//     - `id`: an autoincrementing integer
//       - `username`: regular text.Required.
//       - `email`: regular text.Required.
//   - [] Add`author_id` foreign key column the stories table that references the authors table.
  // > Note, when we delete a story, we **do not ** want to delete the associate`author`, so choose the correct`ON DELETE` contraint. 
//   - [] Add a dummy authors to the db and update stories to have authors.
// - Create a ** V2 ** router file
  // - [] Create a`/router/stories-router-v2.js` router file
    // - [] Require the router file in `server.js` and "mount" using`app.use()`
      - Update the queries in the V2 endpoints to use`author` info.
      // update get all 
      // update get by id
      update UPDATE
      update create
      update delete
      

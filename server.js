'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');
// const morgan = require('morgan');
// const storiesRouter = require('./routers/stories-router');
// const routerV2 = require('./routers/v2-router');


mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Story } = require('./models');

const app = express();
app.use(bodyParser.json());


app.get('/posts', (req, res) => {
  Story
    .find()
    .limit(10)
    .then(posts => {
      res.json({
        post: posts.map(
          (post) => post.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
}); 





app.get('/posts/:id',(req, res) => {
  Story.findById(req.params.id)
    .then(posts => res.json(posts.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.post('/posts', (req,res) => {
  const requiredFields = ['title','author','content'];
  requiredFields.forEach(
    function(item) {
      const field = item
      if(!(field in req.body)) {
        const msg = `Missing ${field} in body`
        console.error(msg);
        return res.status(400).send(msg);
      }
    }
  )
  const {title,author,content} = req.body;
  Story
  .create({
    title,
    author,
    content
  })
  .then(posts => res.json(posts.serialize()))
  .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});



app.delete('/posts/:id',(req,res) =>{
  Story
  .findByIdAndRemove(req.params.id)
  .then(posts => res.status(204).end())
  .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    })
})


// /* ========== GET/READ SINGLE ITEMS ========== */
// //knex version
// // Need to matchup knex ID in database with req.params.id
// // Then return that one full object or story with res.json
// router.get('/stories/:id', (req, res) => {
//   knex('stories')
//     .select('stories.id', 'title', 'content', 'authors.id as authorId', 'username as authorName')
//     .innerJoin('authors', 'stories.author_id', 'authors.id')
//     .where('stories.id', req.params.id)
//     .then(([results]) => {
//       res.json(results);
//     })
//     .catch(err => {
//       console.error(err);
//       return res.status(500).json(err.message);
//     });
// });

// //can use these instead of results[0]
// //knex.first instead of select

// //then(([result]) => res.json(result))

// //static version
// // router.get('/stories/:id', (req, res) => {
// //   const id = Number(req.params.id);
// //   const item = data.find((obj) => obj.id === id);
// //   res.json(item);
// // });

// /* ========== POST/CREATE ITEM ========== */
// router.post('/stories', (req, res) => {

//   const { title, content, author_id } = req.body;

//   knex('stories')
//     .insert({ title, content, author_id })
//     .returning(['id', 'title', 'content', 'author_id'])
//     .then(([result]) => {
//       return knex
//         .select('stories.id', 'title', 'content', 'username as authorName', 'authors.id as authorId')
//         .from('stories')
//         .innerJoin('authors', 'stories.author_id', 'authors.id')
//         .where('stories.id', result.id);
//     })
//     .then(([result]) => {
//       res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
//     });
// });


// // router.post('/stories', (req, res) => {
// //   const {title, content} = req.body;

// //   /***** Never Trust Users! *****/  
// //   const newItem = {
// //     id: data.nextVal++,
// //     title: title,
// //     content: content
// //   };
// //   data.push(newItem);
// //   res.location(`${req.originalUrl}/${newItem.id}`).status(201).json(newItem);
// // });

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
// router.put('/stories/:id', (req, res) => {
//   const { title, content, author_id } = req.body;
//   knex('stories')
//     .update({ title, content, author_id })
//     .where('id', req.params.id)
//     .returning(['id', 'title', 'content', 'author_id'])
//     .then(([result]) => {
//       return knex('stories')
//         .select('stories.id', 'title', 'content', 'username as authorName', 'authors.id as authorId')
//         .innerJoin('authors', 'stories.author_id', 'authors.id')
//         .where('stories.id', result.id);
//     })
//     .then(([result]) => {
//       res.json(result);
//     });


//   /***** Never Trust Users! *****/

//   // const id = Number(req.params.id);
//   // const item = data.find((obj) => obj.id === id);
//   // Object.assign(item, {title, content});
//   // res.json(item);
// });

// /* ========== DELETE/REMOVE A SINGLE ITEM ========== */
// router.delete('/stories/:id', (req, res) => {
//   knex('stories')
//     .where('id', req.params.id)
//     .del()
//     .then(res.status(204).end());

//   // const id = Number(req.params.id);
//   // const index = data.findIndex((obj) => obj.id === id);
//   // data.splice(index, 1);
//   // res.status(204).end();
// });

// module.exports = router;

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
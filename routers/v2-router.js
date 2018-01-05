'use strict';

const express = require('express');
const router = express.Router();

// const data = require('../db/dummy-data');


const { DATABASE } = require('../config');
const knex = require('knex')(DATABASE);


/* ========== GET ALL AUTHORS ========== */

router.get('/authors',  (req, res) => {
  knex
    .select('id', 'email', 'username')
    .from('authors')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });
});

/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {

  knex('stories')
    .innerJoin('authors', 'stories.author_id', '=', 'authors.id')
    .select('stories.id', 'title', 'content', 'author_id', 'authors.username as authorName')
    .orderBy('title')
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });

  // SELECT users.id, email, username, items.id, name, description, completed, user_id 
  // FROM users 
  // JOIN items ON authors.id = stories.author_id;


  // if (req.query.search) {
  //   const filtered = data.filter((obj) => obj.title.includes(req.query.search));
  //   res.json(filtered);
  // } else {
  //   res.json(data);
  // }
});

/* ========== GET/READ SINGLE ITEMS ========== */
//knex version
// Need to matchup knex ID in database with req.params.id
// Then return that one full object or story with res.json
router.get('/stories/:id', (req, res) => {
  knex('stories')
    .innerJoin('authors', 'stories.author_id', '=', 'authors.id')
    .select('stories.id', 'title', 'content', 'author_id', 'authors.username as authorName')
    .where('stories.id', req.params.id)
    .orderBy('title')
    .then(results => {
      console.log(results);
      res.json(results[0]);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });
});

//can use these instead of results[0]
//knex.first instead of select

//then(([result]) => res.json(result))

//static version
// router.get('/stories/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const item = data.find((obj) => obj.id === id);
//   res.json(item);
// });

/* ========== POST/CREATE ITEM ========== */
router.post('/stories', (req, res) => {

  const { title, content, author_id} = req.body;

  knex('stories')
    .insert({ title, content, author_id})
    .returning(['id', 'title', 'content','author_id'])
    .then(results => {
      res.location(`${req.originalUrl}/${results[0].id}`).status(201).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });
});


// router.post('/stories', (req, res) => {
//   const {title, content} = req.body;

//   /***** Never Trust Users! *****/  
//   const newItem = {
//     id: data.nextVal++,
//     title: title,
//     content: content
//   };
//   data.push(newItem);
//   res.location(`${req.originalUrl}/${newItem.id}`).status(201).json(newItem);
// });

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/stories/:id', (req, res) => {
  const { title, content, author_id } = req.body;
  knex('stories')
    .update({title, content, author_id })
    .where('id', req.params.id)
    .returning(['id', 'title', 'content', 'author_id'])
    .then(results => {
      res.json(results[0]);
    });


  /***** Never Trust Users! *****/

  // const id = Number(req.params.id);
  // const item = data.find((obj) => obj.id === id);
  // Object.assign(item, {title, content});
  // res.json(item);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/stories/:id', (req, res) => {
  knex('stories')
    .where('id', req.params.id)
    .del()
    .then(res.status(204).end());

  // const id = Number(req.params.id);
  // const index = data.findIndex((obj) => obj.id === id);
  // data.splice(index, 1);
  // res.status(204).end();
});

module.exports = router;
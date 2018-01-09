'use strict';

const express = require('express');
const router = express.Router();

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
    .innerJoin('authors', 'stories.author_id',  'authors.id')
    .select('stories.id', 'title', 'content', 'author_id', 'authors.username as authorName')
    //.orderBy('created')
    .orderBy('title')
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });

});

/* ========== GET/READ SINGLE ITEMS ========== */
//knex version
// Need to matchup knex ID in database with req.params.id
// Then return that one full object or story with res.json
router.get('/stories/:id', (req, res) => {
  knex('stories')
    .select('stories.id', 'title', 'content', 'authors.id as authorId', 'username as authorName')
    .innerJoin('authors', 'stories.author_id', 'authors.id')
    .where('stories.id', req.params.id)
    .then(([results]) => {
      res.json(results);
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
    .then(([result]) => {
      return knex
        .select('stories.id', 'title', 'content', 'username as authorName', 'authors.id as authorId')
        .from('stories')
        .innerJoin('authors', 'stories.author_id', 'authors.id')
        .where('stories.id', result.id);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
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
    .update({ title, content, author_id })
    .where('id', req.params.id)
    .returning(['id', 'title', 'content', 'author_id'])
    .then(([result]) => {
      return knex('stories')
        .select('stories.id', 'title', 'content', 'username as authorName', 'authors.id as authorId')
        .innerJoin('authors', 'stories.author_id', 'authors.id')
        .where('stories.id', result.id);
    })
    .then(([result]) => {
      res.json(result);
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
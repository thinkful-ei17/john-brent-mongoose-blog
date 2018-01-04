'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/dummy-data');


const { DATABASE } = require('../config');
const knex = require('knex')(DATABASE);

/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {

  knex
    .select('id', 'title', 'content')
    .from('stories')
    .orderBy('title')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json(err.message);
    });
 

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
  // console.log(req.params.id);
  knex 
    .select('id','title', 'content')
    .from('stories')
    .where ('id', req.params.id)
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

//static version
// router.get('/stories/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const item = data.find((obj) => obj.id === id);
//   res.json(item);
// });

/* ========== POST/CREATE ITEM ========== */
router.post('/stories', (req, res) => {

  const {title, content} = req.body;
  
  knex('stories')
    .insert({title: title, content: content}) 
    .returning(['id', 'title', 'content'])
    .then(results => {
      console.log(results);
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results[0]);
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
  const {title, content} = req.body;
  knex('stories')
    .update({'title':title,'content':content})
    .where('id',req.params.id)
    .returning(['id','title','content'])
    .then(results => {
      res.json(results[0]);});

  
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
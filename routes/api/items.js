// import mongoose from 'mongoose'
const mongoose = require('mongoose');
// import { Router } from 'express';
const Router = require('express').Router;
const auth = require('../../middleware/auth');

// Item Model
// import Item from '../../models/Item';
const Item = require('../../models/Item');

const router = Router();

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

 router.get('/', (req, res) => {
    Item
      .find()
      .sort({date: -1})
      .then(items => res.status(200).json(items))
      .catch(err => { 
        console.log(err);
        res.status(400).json({ msg: "No items found" }) 
      });
  });

  // router.get('/', async (req, res) => {
  //   try {
  //     const items = await Item.find();
  //     if (!items) throw Error('No items');
  
  //     res.status(200).json(items);
  //   } catch (e) {
  //     res.status(400).json({ msg: e.message });
  //   }
  // });

  /**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

 router.post('/', auth, (req, res) => {
  
  const { name, date } = req.body;
  const newItem = new Item({ name, 
        //date 
        });

  newItem
    .save()
    .then(item => res.status(200).json(item))
    .catch(err => { 
      console.log(err);
      res.status(400).json({ error: err.message }) 
    });
});

// router.post('/', auth, async (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   try {
//     const item = await newItem.save();
//     if (!item) throw Error('Something went wrong saving the item');

//     res.status(200).json(item);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

 /**
 * @route   DELETE api/items/:id
 * @desc    Delete An Item
 * @access  Private
 */

  // router.delete('/:id', (req, res) => {
  
  //   const { id } = req.params;
  
  //   Item
  //     .findById(id)
  //     .then(item => item.remove().then(item => res.status(200).json(item)))
  //     .catch(err => { 
  //       console.log(err);
  //       res.status(400).json({ error: err.message }) 
  //     });
  // });

  router.delete('/:id', auth, async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) throw Error('No item found');
  
      const removed = await item.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the item');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

module.exports = router;

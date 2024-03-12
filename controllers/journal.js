const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('journalE').find();
  result.toArray().then((err, lists) => {
    if (err){
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a Entry.');
  }
  const recipeId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('journalE').find({ _id: recipeId });
  result.toArray().then((err, lists) => {
    if (err){
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createEntry = async (req, res, next) => {
  const recipe = {
    recipe_name: req.body.recipe_name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    total_time: req.body.total_time,
    difficulty: req.body.difficulty,
    tags: req.body.tags
  };
  const response = await mongodb.getDb().db().collection('journalE').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Entry.');
  }
};

const updateEntry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update a Entry.');
  }
  const recipeId = new ObjectId(req.params.id);
  const filter = { _id: recipeId };
  const recipe = {
    recipe_name: req.body.recipe_name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    total_time: req.body.total_time,
    difficulty: req.body.difficulty,
    tags: req.body.tags
  };
  const response = await mongodb.getDb().db().collection('journalE').replaceOne(filter, recipe);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'An error occurred and we were not able to update your Entry.');
  }
};

const deleteEntry = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete a Entry.');
  }
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('journalE').deleteOne({ _id: recipeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while deleting the Entry.');
  }
};

module.exports = { getAll, getSingle, createEntry, updateEntry, deleteEntry };
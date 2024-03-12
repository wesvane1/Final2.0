const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');



const recipesController = require('../controllers/journal');
const validation = require('../middleware/validate')

router.get('/getAll/', requiresAuth(), recipesController.getAll);

router.get('/getSingle/:id', requiresAuth(), recipesController.getSingle);

router.post('/createRecipe/', requiresAuth(), validation.saveRecipe, recipesController.createEntry);

router.put('/updateRecipe/:id', requiresAuth(), validation.saveRecipe, recipesController.updateEntry);

router.delete('/deleteRecipe/:id', requiresAuth(), recipesController.deleteEntry);

module.exports = router;
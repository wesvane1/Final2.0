const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/getAll/', requiresAuth(), userController.getAll);
router.get('/getSingle/:id', requiresAuth(), userController.getSingleUser);
router.post('/createSingle/', requiresAuth(), validation.saveUser, userController.createUser);
router.put('/updateSingle/:id', requiresAuth(), validation.saveUser, userController.updateUser);
router.delete('/deleteSingle/:id', requiresAuth(), userController.deleteSingle);

module.exports = router;
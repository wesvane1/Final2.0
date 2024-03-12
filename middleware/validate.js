const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
  const validationRule = {
    recipe_name: 'required|string',
    description: 'required|string',
    ingredients: 'required|string',
    instructions: 'required|string',
    total_time: 'required|string',
    difficulty: 'required|string',
    tags: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRecipe,
  saveUser
};
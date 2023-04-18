const validator = require('express-validator');

function UserFormValidation() {
  return [
    validator.body('name','errrrrorrrrrrr').isEmpty()
  ]
}

const ValidateInputs =  (req, res , next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        next();
    }
}

module.exports = {
    ValidateInputs,
    UserFormValidation
}
const { body, validationResult } = require('express-validator') ;

function UserFormValidation() {
  return [
    body('name','errrrrorrrrrrr').isEmpty()
  ]
}

const ValidateInputs =  (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
        next();
    }
}

module.exports={
    ValidateInputs,
    UserFormValidation
}
const express = require('express');
const router = express.Router();
const Auth = require('../../controllers/AuthenticationController')



router.post('/login',Auth.login);



module.exports = router
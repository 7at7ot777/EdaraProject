const express = require('express');
const router = express.Router();
const Auth = require('../../controllers/AuthenticationController')



router.get('/login',Auth.login);



module.exports = router
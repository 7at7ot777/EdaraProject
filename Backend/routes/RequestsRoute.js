const express = require('express');
const router = express.Router();
const Request = require('../controllers/RequestsController')



router.post('/makeRequest',Request.makeRequest)
router.get('/acceptRequest',Request.acceptRequest)
router.get('/rejectRequest',Request.rejectRequest)
router.get('/getRequests',Request.getRequests);
router.delete('/deleteRequest/:requestID',Request.deleteRequest)






module.exports = router
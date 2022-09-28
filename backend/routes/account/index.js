const express = require('express');
const router = express.Router();

const accountController = require('../../controllers/account/accountController');


router.post('/getTimeSavingRoute',accountController.provideMaxRoute)



module.exports = router;